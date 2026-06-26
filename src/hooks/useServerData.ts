import { useEffect, useState } from 'react';
import type {
  AssignedUser,
  EventResponse,
  SignedInUser,
  SupervisorGroup,
  UserGroupsResponse,
  UserResponse,
} from '../utils/types';
import fetchJSON from '../utils/fetchJSON';

export default function useServerData() {
  const [assignedUsers, setAssignedUsers] = useState<AssignedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshTime, setLastRefreshTime] = useState<string | null>(null);

  useEffect(() => {
    fetchSystemUsageData();
  }, []);

  // gets the user details along with their auth token
  const getAuthenticationDetails = () => {
    const userString = sessionStorage.getItem('user'); // get user details
    const auth = sessionStorage.getItem('auth'); // get auth token

    if (!userString || !auth) {
      throw new Error('No user is logged in. Please log in and try again.');
    }

    const signedInUser: SignedInUser = JSON.parse(userString);
    return {
      signedInUser,
      auth,
    };
  };

  // gets the supervsior group for the signed in user
  const getSupervisorUserGroup = (
    response: UserGroupsResponse,
    signedInUser: SignedInUser
  ): SupervisorGroup => {
    // get the names of all user groups where the id of the signed in user is part of the user group name
    const supervisorGroup = response.userGroups.find((val) =>
      val.displayName.includes(signedInUser.id)
    );

    if (!supervisorGroup) {
      throw new Error(
        `No supervisor group found. Please check the server if a group was created for this supervisor.`
      );
    }

    return {
      ...supervisorGroup,
      users: supervisorGroup.users.filter(
        (user) => user.id !== signedInUser.id
      ),
    };
  };

  const fetchMostRecentEvents = (
    assignedUsers: UserResponse[],
    auth: string
  ): Promise<EventResponse[]> => {
    const requests = assignedUsers.flatMap((assignedUser) =>
      assignedUser.organisationUnits.map((ou) => {
        // fetch the most recent event synced to the user's organisation unit
        return fetchJSON<EventResponse>(
          `/api/tracker/events?orgUnit=${ou.id}&pageSize=1&order=createdAt:desc&fields=event,status,createdAt,createdBy`,
          auth
        );
      })
    );

    return Promise.all(requests);
  };

  const fetchUsersWithOrgUnits = (
    assignedUsers: AssignedUser[],
    auth: string
  ): Promise<UserResponse[]> => {
    const requests = assignedUsers.map((assignedUser) =>
      // fetch the id and assigned organisation units of the user in the supervisor user group
      fetchJSON<UserResponse>(
        `/api/users/${assignedUser.id}?fields=id,organisationUnits`,
        auth
      )
    );

    return Promise.all(requests);
  };

  const getUsersWithLastSyncDate = (
    supervisorGroup: SupervisorGroup,
    mostRecentEvents: EventResponse[]
  ) => {
    return supervisorGroup.users.map((user) => {
      const event = mostRecentEvents.find(
        (event) => event.instances[0]?.createdBy.uid === user.id
      );

      if (!event) {
        return user;
      }

      return {
        ...user,
        lastSyncDate: event?.instances[0].createdAt,
      };
    });
  };

  const fetchUserGroupsBelongingToSignedInUser = async (
    signedInUser: SignedInUser,
    auth: string
  ) => {
    // get user groups that the signed in user is a part of
    return fetchJSON<UserGroupsResponse>(
      `/api/userGroups?filter=users.id:eq:${signedInUser.id}&fields=id,displayName,users`,
      auth
    );
  };

  // sets the date time when the system usage data was last refreshed
  const updateRefreshTime = () => {
    const now = new Date();

    const formatted = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);

    setLastRefreshTime(formatted);
  };

  const fetchSystemUsageData = async () => {
    setError(null);
    setLoading(true);

    try {
      const { signedInUser, auth } = getAuthenticationDetails();
      const userGroups = await fetchUserGroupsBelongingToSignedInUser(
        signedInUser,
        auth
      );
      const supervisorGroup = getSupervisorUserGroup(userGroups, signedInUser);
      const users = await fetchUsersWithOrgUnits(supervisorGroup.users, auth);
      const mostRecentEvents = await fetchMostRecentEvents(users, auth);
      const usersWithLastSyncDate = getUsersWithLastSyncDate(
        supervisorGroup,
        mostRecentEvents
      );

      updateRefreshTime();
      setAssignedUsers(usersWithLastSyncDate);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchSystemUsageData,
    assignedUsers,
    loading,
    error,
    lastRefreshTime,
  };
}
