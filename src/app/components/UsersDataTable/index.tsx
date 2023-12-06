import Link from 'next/link';
import { DataTableContainer } from './styles';

interface User {
  id: string;
  name: string;
  email: string;
  groups: number[];
}

interface UsersDataTableProps {
  data: User[],
}

export function UsersDataTable({ data }: UsersDataTableProps) {
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
          {data.map((dataItem) => {
            // UsersDataTable rows
            return (
              <tr key={dataItem.id}>
                <td>{dataItem.id}</td>
                <td>{dataItem.name}</td>
                <td>{dataItem.email}</td>
                <td>{dataItem.groups.length} groups</td>
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
