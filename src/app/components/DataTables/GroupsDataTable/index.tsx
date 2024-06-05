import Link from 'next/link';
import styles from '../DataTable.module.css';
import { Group } from '@/interfaces';

interface GroupsDataTableProps {
  groups: Group[]
}

export function GroupsDataTable({ groups }: GroupsDataTableProps) {
  return (
    <div className={styles.dataTable}>
      <table>
        <thead>
          <tr>
            {/* GroupsDataTable's head */}
            <th className={styles.dataTableHead}>ID</th>
            <th className={styles.dataTableHead}>Name</th>
            <th className={styles.dataTableHead}>#Users</th>
            <th className={styles.dataTableHead}></th>
          </tr>
        </thead>
        <tbody>
          {/* GroupsDataTable rows */}
          {groups.map((group) => {
            const numberOfUsersText = group.usersId.length > 1 ? 
              `${group.usersId.length} users` : 
              `${group.usersId.length} user`;
  
            return (
              <tr key={group.id}>
                <td className={styles.tableData}>{group.id}</td>
                <td className={styles.tableData}>{group.name}</td>
                <td className={styles.tableData}>{numberOfUsersText}</td>
                <td className={styles.tableData}>
                  <Link href={`/groups/${group.id}`}>
                    See Group Details
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
