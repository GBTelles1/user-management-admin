'use client';
import { Group, User } from '@/interfaces';
import { UserDetail } from './styles';

interface UserViewModeProps {
  currentUser: User
  currentUserGroups: Group[]
}

export function UserViewMode({ currentUser, currentUserGroups }: UserViewModeProps) {
  return (
    <>
      <h2>ID</h2>
      <UserDetail>{currentUser.id}</UserDetail>

      <h2>Name</h2>
      <UserDetail>{currentUser.name}</UserDetail>

      <h2>Email</h2>
      <UserDetail>{currentUser.email}</UserDetail>

      <h2>Groups</h2>
      <UserDetail>
        {currentUserGroups.map((group) => {
          return <div key={group.id}>{group.name}</div>;
        })}
      </UserDetail>
    </>
  );
}
