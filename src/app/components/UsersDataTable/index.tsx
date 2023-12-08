import Link from 'next/link';
import { DataTableContainer } from './styles';
import { User } from '@/interfaces';

interface UsersDataTableProps {
  users: User[],
}

export function UsersDataTable({ users }: UsersDataTableProps) {
  return (
    <DataTableContainer>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>#Groups</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const numberOfGroupsText = user.groupsId.length === 1 ? 
              `${user.groupsId.length} group` : 
              `${user.groupsId.length} groups`;
            // UsersDataTable rows
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{numberOfGroupsText}</td>
                <td>
                  <Link href={`/users/${user.id}`}>
                    See Details
                  </Link>
                </td>
              </tr> 
            );
          })}
        </tbody>
      </table>
    </DataTableContainer>
  );
}
