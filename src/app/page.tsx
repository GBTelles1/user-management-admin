import { RedirectCreatePageButton } from './components/RedirectCreatePageButton';
import { UsersDataTable } from './components/DataTables/UsersDataTable';
import styles from '../styles/MainContainer/MainContainer.module.css';
import { getUsers } from './users/actions/getUsers';

export default async function Home() {
  const users = await getUsers();
  
  return (
    <main className={styles.mainContainer}>
      <RedirectCreatePageButton dataType={'users'} />
      <UsersDataTable users={users} />
    </main>
  );
}
