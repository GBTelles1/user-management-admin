import { RedirectCreatePageButton } from '../components/RedirectCreatePageButton';
import { GroupsDataTable } from '../components/DataTables/GroupsDataTable';
import styles from '@/styles/MainContainer/MainContainer.module.css';
import { getGroups } from './actions';

export default async function GroupsPage() {
  const groups = await getGroups();
  
  return (
    <main className={styles.mainContainer}>
      <RedirectCreatePageButton dataType='groups' />
      <GroupsDataTable groups={groups}/>
    </main>
  );
}
