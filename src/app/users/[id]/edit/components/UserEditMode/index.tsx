import { SaveEntityButtonForm } from '@/app/components/SaveEntityButtonForm';
import { Group, User } from '@/interfaces';
import { UpdateUserFormPage } from '../UpdateUserFormPage';
import styles from './UserEditMode.module.css';
import { UpdateUserForm } from '../UpdateUserForm';
import { DeleteEntityButton } from '@/app/components/DeleteEntityButton';

interface UserEditModeProps {
  currentUserId: string;
}

export async function UserEditMode({ currentUserId }: UserEditModeProps) {
  // async function removeGroupFromUser(group: Group) {
  //   const updatedUser = {
  //     ...currentUser,
  //     groupsId: currentUser.groupsId.filter((groupsIdItem) => {
  //       return groupsIdItem !== group.id;
  //     }),
  //   };
  //   const updatedGroup = {
  //     ...group,
  //     usersId: group.usersId.filter((usersIdItem) => {
  //       return usersIdItem !== currentUser.id;
  //     }),
  //   };

  //   setCurrentUser(updatedUser);
  //   await updateUser(updatedUser)
  //     .then(() => {
  //       setMessage("Saved!");
  //     })
  //     .catch(() =>
  //       setMessage(
  //         "Failed to remove user from Group, please check your entries and try again",
  //       ),
  //     );

  //   await updateGroup(updatedGroup)
  //     .then(() => {
  //       setMessage("Saved!");
  //     })
  //     .catch(() =>
  //       setMessage(
  //         "Failed to remove user from Group, please check your entries and try again",
  //       ),
  //     );
  // }

  // function getGroupsIdUpdated(newGroupsId: string[]) {

  //   // Add the new groupsId
  //   const groupsIdUpdated = [...currentUser.groupsId, ...newGroupsId];

  //   return groupsIdUpdated;
  // }

  return (
    <div className={styles.editUserPage}>
      <UpdateUserFormPage>
        <UpdateUserForm currentUserId={currentUserId} />
      </UpdateUserFormPage>

      <div className={styles.saveDeleteButtons}>
        <SaveEntityButtonForm />
        <DeleteEntityButton
          currentEntityId={currentUserId}
          entityType={'user'}
        />
      </div>
    </div>
  );
}
