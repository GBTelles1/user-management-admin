import Link from 'next/link';
import { User } from '@/interfaces';
import styles from '../DataTable.module.css';

interface UsersDataTableProps {
  users: User[],
}

export function UsersDataTable({ users }: UsersDataTableProps) {
  return (
    <div className={styles.dataTable}>
      <table>
        <thead>
          {/* UsersDataTable's head */}
          <tr>
            <th className={styles.dataTableHead}>ID</th>
            <th className={styles.dataTableHead}>Name</th>
            <th className={styles.dataTableHead}>Email</th>
            <th className={styles.dataTableHead}>#Groups</th>
            <th className={styles.dataTableHead}></th>
          </tr>
        </thead>
        <tbody>
          {/* UsersDataTable rows */}
          {users.map((user) => {
            const numberOfGroupsText = user.groupsId.length > 1 ? 
              `${user.groupsId.length} groups` : 
              `${user.groupsId.length} group`;
            return (
              <tr key={user.id}>
                <td className={styles.tableData}>{user.id}</td>
                <td className={styles.tableData}>{user.name}</td>
                <td className={styles.tableData}>{user.email}</td>
                <td className={styles.tableData}>{numberOfGroupsText}</td>
                <td className={styles.tableData}>
                  <Link href={`/users/${user.id}`}>
                    See User Details
                  </Link>
                </td>
              </tr> 
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
