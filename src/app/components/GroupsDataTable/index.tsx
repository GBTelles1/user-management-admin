import Link from 'next/link';
import { DataTableContainer } from './styles';

interface Group {
  id: number
  name: string
  users: string[]
}

interface GroupsDataTableProps {
  groups: Group[]
}

export function GroupsDataTable({ groups }: GroupsDataTableProps) {
  return (
    <DataTableContainer>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>#Users</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => {
            const numberOfUsersText = group.users.length > 1 ? 
              `${group.users.length} users` : 
              `${group.users.length} user`;
  
            // GroupsDataTable rows
            return (
              <tr key={group.id}>
                <td>{group.id}</td>
                <td>{group.name}</td>
                <td>{numberOfUsersText}</td>
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
