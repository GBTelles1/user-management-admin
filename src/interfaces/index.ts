export interface Community {
  id: string;
  name: string;
  usersId: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  groupsId: string[];
}
