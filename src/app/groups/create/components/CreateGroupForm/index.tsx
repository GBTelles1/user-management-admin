import { SaveEntityButtonForm } from '@/app/components/SaveEntityButtonForm';
import { getUsers } from '@/app/users/actions';
import styles from './CreateGroupForm.module.css';

export async function CreateGroupForm() {
  const users = await getUsers();
  return (
    <div className={styles.createGroupForm}>
      <h1>Create a new group</h1>

      <div className={styles.formInput}>
        <label htmlFor="name">What&apos;s the group&apos;s name?</label>
        <input type="text" id="name" name="name" placeholder="Group's name" required />
      </div>

      <div className={styles.formInput}>
        <label htmlFor="users">What&apos;s(&apos;re) your(s) user(s)?</label>
        <select id="users" name="users" >
          <option value=''>Select your user</option>
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
      </div>

      <SaveEntityButtonForm />
    </div>
  );
}
