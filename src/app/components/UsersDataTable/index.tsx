import Link from 'next/link';
import { DataTableContainer } from './styles';

interface User {
  id: string;
  name: string;
  email: string;
  groups: number[];
}

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
          {users.map((usersItem) => {
            const numberOfGroupsText = usersItem.groups.length === 1 ? 
              `${usersItem.groups.length} group` : 
              `${usersItem.groups.length} groups`;
            // UsersDataTable rows
            return (
              <tr key={usersItem.id}>
                <td>{usersItem.id}</td>
                <td>{usersItem.name}</td>
                <td>{usersItem.email}</td>
                <td>{numberOfGroupsText}</td>
                <td>
                  <Link href={'#'}>
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
