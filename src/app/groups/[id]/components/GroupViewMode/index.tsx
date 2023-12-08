import { Group, User } from '@/interfaces';
import { UserDetail } from './styles';

interface GroupViewModeProps {
  currentGroup: Group
  currentGroupUsers: User[]
}

export function GroupViewMode({ currentGroup, currentGroupUsers }: GroupViewModeProps) {
  return (
    <>
      <h2>ID</h2>
      <UserDetail>{currentGroup.id}</UserDetail>

      <h2>Name</h2>
      <UserDetail>{currentGroup.name}</UserDetail>

      <h2>Users</h2>
      <UserDetail>
        {currentGroupUsers.map((user) => {
          return <div key={user.id}>{user.name}</div>;
        })}
      </UserDetail>
    </>
  );
}
