export type UserGroupsResponse = {
  pager: {};
  userGroups: [
    {
      displayName: string;
      id: string;
      users: [{ id: string; name: string }];
    },
  ];
};

export type UserResponse = {
  id: string;
  organisationUnits: [{ id: string }];
};

export type EventResponse = {
  instances: [
    {
      event: string;
      status: string;
      createdAt: string;
      createdBy: {
        uid: string;
      };
    },
  ];
};

export type SignedInUser = {
  id: string;
  firstName: string;
  surname: string;
};

// status 1 - doing well, 2 - needs monitoring, 3 - follow up
export type AssignedUser = {
  id: string;
  name: string;
  lastSyncDate?: string;
  status?: number;
};

export type SupervisorGroup = {
  displayName: string;
  id: string;
  users: {
    id: string;
    name: string;
  }[];
};
