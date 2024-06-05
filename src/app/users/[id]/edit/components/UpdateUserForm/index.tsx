import { SaveEntityButtonForm } from '@/app/components/SaveEntityButtonForm';
import { getGroups, getGroupsByIdList } from '@/app/groups/actions';
import styles from './UpdateUserForm.module.css';
import { User } from '@/interfaces';
import { getUserById } from '@/app/users/actions';

interface UpdateUserFormProps {
  currentUserId: string;
}

export async function UpdateUserForm({ currentUserId }: UpdateUserFormProps) {
  const currentUser = await getUserById(currentUserId);

  const currentUserGroups = await getGroupsByIdList(currentUser.groupsId);

  const allGroups = await getGroups();

  const groupsWithoutCurrentUser = allGroups.filter((group) => {
    return !currentUser.groupsId.includes(group.id);
  });
  return (
    <div className={styles.updateUserForm}>
      <div className={styles.formInputContainer}>
        <label htmlFor="userId">ID</label>
        <input
          className={styles.readOnlyFormInput}
          type="text"
          name="userId"
          value={currentUser.id}
          readOnly
        />
      </div>

      <div className={styles.formInputContainer}>
        <label htmlFor="name">Name</label>
        <input
          className={styles.formInput}
          type="text"
          id="name"
          name="name"
          defaultValue={currentUser.name}
          required
        />
      </div>

      <div className={styles.formInputContainer}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.formInput}
          type="text"
          id="email"
          name="email"
          defaultValue={currentUser.email}
          required
        />
      </div>

      <h2>Edit current groups</h2>
      <div className={styles.currentUserGroups}>
        {currentUserGroups.map((group) => {
          return (
            <div className={styles.currentGroup} key={group.id}>
              <input
                key={group.id}
                type="checkbox"
                id={`currentUserGroup-${group.id}`}
                name="currentUserGroups"
                defaultValue={group.id}
                defaultChecked
              />
              <label htmlFor={`currentUserGroup-${group.id}`}>
                {group.name}
              </label>
              <br />
              {/* <input type="checkbox" id='currentUserGroups' name='currentUserGroups' value={group.id} checked>
                <label for="currentUserGroups"> {group.name}</label><br> */}
              {/* <div>{group.name}</div> */}
              {/* <button onClick={() => removeGroupFromUser(group)}>
                  Remove
                </button> */}
            </div>
          );
        })}
      </div>

      <div className={styles.formInputContainer}>
        <label htmlFor="groups">Select a new group</label>
        <select
          className={styles.formInput}
          id="groups"
          name="groups"
          placeholder="Your group(s)"
        >
          <option value="">Select your group</option>
          {groupsWithoutCurrentUser.map((group) => {
            return (
              <option key={group.id} value={group.id.toString()}>
                {group.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
