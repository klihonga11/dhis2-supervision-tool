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

export type SignedInUser = {
  id: string;
  firstName: string;
  surname: string;
};

export type AssignedUser = {
  id: string;
  name: string;
};
