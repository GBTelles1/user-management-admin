import { z } from 'zod';
import {
  UpdateGroupForm,
  CurrentUser,
  CurrentUsers,
  DeleteButton,
  EditPageContainer,
  FormInput,
  SaveDeleteButtons,
  GroupDetail,
} from './styles';
import { SetStateAction, useEffect, useState } from 'react';
import { SaveEntityButtonForm } from '@/app/components/SaveEntityButtonForm';
import { Group, User } from '@/interfaces';
import { getUsers, updateUser } from '@/app/users/actions';
import { deleteGroup, updateGroup } from '@/app/groups/actions';

const updateGroupSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  usersId: z.array(z.string()),
});

interface GroupEditModeProps {
  currentGroup: Group;
  // setCurrentGroup: (value: SetStateAction<Group>) => void;
  currentGroupUsers: User[];
}

export async function GroupEditMode({
  currentGroup,
  currentGroupUsers,
}: GroupEditModeProps) {
  const [message, setMessage] = useState('');
  // const [users, setUsers] = useState<User[]>([]);
  const allUsers = await getUsers();

  const usersOutsideCurrentGroup = allUsers.filter((user) => {
    return !currentGroup.usersId.includes(user.id);
  });
  // async function getUsers() {
  //   const usersData: User[] = await fetch('http://localhost:3004/users').then(
  //     (res) => res.json()
  //   );

  //   if (!usersData) {
  //     return;
  //   }

  //   // This will be used to add a new group, so I don't need to
  //   const users = usersData.filter((user) => {
  //     return !currentGroup.usersId.includes(user.id);
  //   });

  //   setUsers(users);
  // }

  // async function updateUser(updatedUser: User) {
  //   await fetch(`http://localhost:3004/users/${updatedUser.id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(updatedUser),
  //     next: { tags: [`User-${updatedUser.id}`] },
  //   });
  // }

  // async function updateGroup(updatedGroup: Group) {
  //   await fetch(`http://localhost:3004/groups/${currentGroup.id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(updatedGroup),
  //     next: { tags: [`Group-${updatedGroup.id}`] },
  //   });
  // }

  // async function deleteGroup(groupId: string) {
  //   await fetch(`http://localhost:3004/groups/${groupId}`, {
  //     method: 'DELETE',
  //   });
  // }

  async function removeUserFromGroup(user: User) {
    const updatedGroup = {
      ...currentGroup,
      usersId: currentGroup.usersId.filter((usersIdItem) => {
        return usersIdItem !== user.id;
      }),
    };
    const updatedUser = {
      ...user,
      groupsId: user.groupsId.filter((groupsIdItem) => {
        return groupsIdItem !== currentGroup.id;
      }),
    };

    // setCurrentGroup(updatedGroup);
    await updateGroup(updatedGroup)
      .then(() => {
        setMessage('Saved!');
      })
      .catch(() =>
        setMessage(
          'Failed to save user, please check your entries and try again'
        )
      );

    await updateUser(updatedUser)
      .then(() => {
        setMessage('Saved!');
      })
      .catch(() =>
        setMessage(
          'Failed to remove user from Group, please check your entries and try again'
        )
      );
  }

  function getUsersIdUpdated(newUsersIdData: string[]) {
    const newUsersId = newUsersIdData.filter((newUserId) => {
      // Return only the user ID that's not in Group's groupsId
      return !currentGroup.usersId.includes(newUserId);
    });

    // If there are no new groups, return the previous User's groupsId list
    if (newUsersId.length < 0) {
      return currentGroup.usersId;
    }

    // Add the new groupId
    const usersIdUpdated = [...currentGroup.usersId, ...newUsersId];

    return usersIdUpdated;
  }

  // async function updateGroupForm(formData: FormData) {
  //   // To create update a Group, we also need to update the users

  //   // Validating the Group's usersId list
  //   const newUsersIdData = formData.getAll('users').map((userId) => {
  //     return userId.toString();
  //   });

  //   const newUsersIdChecked = newUsersIdData.filter((newUserId) => {
  //     return newUserId !== '';
  //   });

  //   // Getting group's usersId list updated
  //   const usersIdUpdated = getUsersIdUpdated(newUsersIdChecked);

  //   // First, parsing the formData with updateUserSchema to ensure the User type
  //   const parsedGroup = updateGroupSchema.safeParse({
  //     id: currentGroup.id,
  //     name: formData.get('name'),
  //     usersId: usersIdUpdated,
  //   });

  //   if (!parsedGroup.success) {
  //     setMessage(
  //       'Failed to save group, please check your entries and try again'
  //     );
  //     return { message: 'Failed to save group' };
  //   }

  //   const updatedGroup = parsedGroup.data;

  //   // Update the user
  //   // setCurrentGroup(updatedGroup);
  //   await updateGroup(updatedGroup)
  //     .then(() => {
  //       setMessage('Saved!');
  //     })
  //     .catch(() =>
  //       setMessage(
  //         'Failed to save group, please check your entries and try again'
  //       )
  //     );

  //   // Update users
  //   newUsersIdChecked.map(async (userId) => {
  //     // Get the group by the ID
  //     const userResponse = await fetch(`http://localhost:3004/users/${userId}`);
  //     const userToUpdate: User = await userResponse.json();

  //     // Update the groupsId list
  //     const userUpdated = {
  //       ...userToUpdate,
  //       groupsId: [...userToUpdate.groupsId, updatedGroup.id],
  //     };

  //     // Update user
  //     await updateUser(userUpdated);
  //   });
  // }

  return (
    <EditPageContainer>
      <UpdateGroupForm action={updateGroupForm}>
        <h2>ID</h2>
        <GroupDetail>{currentGroup.id}</GroupDetail>

        <FormInput>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={currentGroup.name}
            required
          />
        </FormInput>

        <h2>Edit current users</h2>
        <CurrentUsers>
          {currentGroupUsers.map((user) => {
            return (
              <CurrentUser key={user.id}>
                <div>{user.name}</div>
                <button onClick={() => removeUserFromGroup(user)}>
                  Remove
                </button>
              </CurrentUser>
            );
          })}
        </CurrentUsers>

        <FormInput>
          <label htmlFor="users">Select a new user</label>
          <select id="users" name="users">
            <option value="">Select an user</option>
            {usersOutsideCurrentGroup.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </FormInput>

        <SaveDeleteButtons>
          <SaveEntityButtonForm />

          {!!message && <span>{message}</span>}
        </SaveDeleteButtons>
      </UpdateGroupForm>
      <DeleteButton
        onClick={async () => {
          await deleteGroup(currentGroup.id);
        }}
        disabled={currentGroup.usersId.length > 0}
      >
        Delete Group
      </DeleteButton>
    </EditPageContainer>
  );
}
