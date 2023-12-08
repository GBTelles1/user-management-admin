import { z } from 'zod';
import { UpdateUserForm, CurrentGroup, CurrentGroups, DeleteButton, EditPageContainer, FormInput, SaveDeleteButtons, UserDetail } from './styles';
import { SetStateAction, useEffect, useState } from 'react';
import { CreateEntityButtonForm } from '@/app/components/CreateEntityButtonForm';
import { Group, User } from '@/interfaces';

const updateUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  groupsId: z.array(z.string()).nonempty(),
});

interface UserEditModeProps {
  currentUser: User
  setCurrentUser: (value: SetStateAction<User>) => void
  currentUserGroups: Group[]
}

export function UserEditMode({ currentUser, setCurrentUser, currentUserGroups }: UserEditModeProps) {
  const [message, setMessage] = useState('');  
  const [groups, setGroups] = useState<Group[]>([]);

  async function getGroups() {
    const groupsData: Group[] = await fetch('http://localhost:3004/groups')
      .then((res) => res.json());
  
    if (!groupsData) {
      return;
    }

    // This will be used to add a new group, so I don't need to 
    const groups = groupsData.filter((group) => {
      return !currentUser.groupsId.includes(group.id);
    });
   
    setGroups(groups);
  }
  
  async function updateGroup(updatedGroup: Group) {
    await fetch(`http://localhost:3004/groups/${updatedGroup.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGroup),
      next: { tags: [`Group-${updatedGroup.id}`] }
    });
  }
  
  async function updateUser(updatedUser: User) {
    await fetch(`http://localhost:3004/users/${currentUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
      next: { tags: [`User-${updatedUser.id}`] }
    });
  }

  async function deleteUser(userId: string) {
    await fetch(`http://localhost:3004/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async function removeGroupFromUser(group: Group) {
    const updatedUser = { ...currentUser,
      groupsId: currentUser.groupsId.filter((groupsIdItem) => {
        return groupsIdItem !== group.id;
      })
    };
    const updatedGroup = { ...group,
      usersId: group.usersId.filter((usersIdItem) => {
        return usersIdItem !== currentUser.id;
      })
    };
  
    setCurrentUser(updatedUser);
    await updateUser(updatedUser)
      .then(() => {
        setMessage('Saved!');
      })
      .catch(() => setMessage('Failed to remove user from Group, please check your entries and try again'));
    
    await updateGroup(updatedGroup)
      .then(() => {
        setMessage('Saved!');
      })
      .catch(() => setMessage('Failed to remove user from Group, please check your entries and try again'));
  }

  function getGroupsIdUpdated(newGroupsIdData: string[] ) {
    console.log({ newGroupsIdData });
    console.log(currentUser.groupsId);
    
    const newGroupsId = newGroupsIdData.filter((newGroupId) => {
      // Return only the group ID that's not in User's groupsId
      return !currentUser.groupsId.includes(newGroupId);
    });
    console.log({ newGroupsId });
    

    // If there are no new groups, return the previous User's groupsId list
    if (newGroupsId.length < 0) {
      return currentUser.groupsId;
    }

    // Add the new groupId
    const groupsIdUpdated = [...currentUser.groupsId, ...newGroupsId];

    return groupsIdUpdated;
  }

  async function updateUserForm(formData: FormData) {
    // To create update a User, we also need to update the groups

    // Getting and validating the User's groupsId list
    const newGroupsIdData = formData.getAll('groups').map((groupId) => {
      return groupId.toString();
    });

    const newGroupsIdChecked = newGroupsIdData.filter((newGroupId) => {
      return newGroupId !== '';
    });

    // Getting user's groupsId list updated
    const groupsIdUpdated = getGroupsIdUpdated(newGroupsIdChecked);

    // First, parsing the formData with updateUserSchema to ensure the User type
    const parsedUser = updateUserSchema.safeParse({
      id: currentUser.id,
      name: formData.get('name'),
      email: formData.get('email'),
      groupsId: groupsIdUpdated,
    });

    if (!parsedUser.success) {
      setMessage('Failed to save user, please check your entries and try again');
      return { message: 'Failed to save user' };
    }
  
    const updatedUser = parsedUser.data;

    // Update the user
    setCurrentUser(updatedUser);
    await updateUser(updatedUser)
      .then(() => {
        setMessage('Saved!');
      })
      .catch(() => setMessage('Failed to save user, please check your entries and try again'));

    // Update groups
    newGroupsIdChecked.map(async (groupId) => {
      // Get the group by the ID
      const groupResponse = await fetch(`http://localhost:3004/groups/${groupId}`);
      const groupToUpdate: Group = await groupResponse.json();
      
      // Update the usersId list
      const groupUpdated = {
        ...groupToUpdate,
        usersId: [...groupToUpdate.usersId, updatedUser.id]
      };
      
      // Update group
      await updateGroup(groupUpdated);
    });
  }

  useEffect(() => {getGroups();}, []);
  return (
    <EditPageContainer>
      <UpdateUserForm action={updateUserForm}>
        <h2>ID</h2>
        <UserDetail>{currentUser.id}</UserDetail>

        <FormInput>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={currentUser.name}
          />
        </FormInput>
      
        <FormInput>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={currentUser.email}
          />
        </FormInput>

        <h2>Edit current groups</h2>
        <CurrentGroups>
          {currentUserGroups.map((group) => {
            return (
              <CurrentGroup key={group.id}>
                <div>{group.name}</div>
                <button onClick={() => removeGroupFromUser(group)}>Remove</button>
              </CurrentGroup>
            );
          })}
        </CurrentGroups>

        <FormInput>
          <label htmlFor="groups">Select a new group</label>
          <select id="groups" name="groups" placeholder="Your group(s)" >
            <option value=''>Select your group</option>
            {groups.map((group) => {
              return (
                <option key={group.id} value={group.id.toString()}>
                  {group.name}
                </option>
              );
            })}
          </select>
        </FormInput>
      
        <SaveDeleteButtons>
          <CreateEntityButtonForm />

          {!!message && <span>{message}</span>}
        </SaveDeleteButtons>
      </UpdateUserForm>
      <DeleteButton onClick={async () => {
        await deleteUser(currentUser.id);
      }}>Delete User</DeleteButton>
    </EditPageContainer>
  );
}
