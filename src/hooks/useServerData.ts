import { useState } from 'react';
import type {
  AssignedUser,
  SignedInUser,
  UserGroupsResponse,
} from '../utils/types';

export default function useServerData() {
  const [assignedUsers, setAssignedUsers] = useState<AssignedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  const getSupervisorGroup = (
    response: UserGroupsResponse,
    user: SignedInUser
  ) => {
    // get the names of all user groups where the id of the signed in user is part of the user group name
    const supervisorGroup = response.userGroups.filter((val) =>
      val.displayName.includes(user.id)
    );

    if (supervisorGroup.length == 0) {
      throw new Error(
        'No supervisor group found. Please check the server if a group was created for this supervisor.'
      );
    } else if (supervisorGroup.length > 1) {
      throw new Error(
        'More than one supervisor group found. Please check the server and make sure the signed in user only has one group.'
      );
    }

    return supervisorGroup[0];
  };

  // fetch users assigned to the signed in user using the DHIS2 api
  const fetchAssignedUsers = async () => {
    setError(null);
    setLoading(true);

    try {
      const { signedInUser, auth } = getAuthenticationDetails();

      // get user groups that the signed in user is a part of
      const request = await fetch(
        `/api/userGroups?filter=users.id:eq:${signedInUser.id}&fields=id,displayName,users`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      );

      if (!request.ok) {
        throw new Error(`Failed to fetch assigned users - ${request.status}`);
      }

      const response: UserGroupsResponse = await request.json();
      const supervisorGroup = getSupervisorGroup(response, signedInUser);
      setAssignedUsers(supervisorGroup.users);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchAssignedUsers,
    assignedUsers,
    loading,
    error,
  };
}
