import { SaveEntityButtonForm } from '@/app/components/SaveEntityButtonForm';
import { getCommunities } from '@/app/groups/actions';
import styles from './createUserForm.module.css';

export async function CreateUserForm() {
  const groups = await getCommunities();

  return (
    <div className={styles.createUserForm}>
      <h1>Create a new user</h1>

      <div className={styles.formInput}>
        <label htmlFor="name">What&apos;s your name?</label>
        <input type="text" id="name" name="name" placeholder="Your name" required />
      </div>
      
      <div className={styles.formInput}>
        <label htmlFor="email">What&apos;s your email?</label>
        <input type="email" id="email" name="email" placeholder="Your email" required />
      </div>

      <div className={styles.formInput}>
        <label htmlFor="groups">What&apos;s(&apos;re) your(s) group(s)?</label>
        <select id="groups" name="groups" required >
          <option value=''>Select your group</option>
          {groups.map((group) => {
            return (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            );
          })}
        </select>
      </div>

      <SaveEntityButtonForm />
    </div>
  );
}
