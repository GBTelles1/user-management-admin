'use client';
import { useEffect, useState } from 'react';
import { CreateGroupForm, FormInput } from './styles';
import { z } from 'zod';
import { CreateEntityButtonForm } from '../../components/CreateEntityButtonForm';
import { User } from '@/interfaces';

const createGroupSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  usersId: z.array(z.string()),
});

export default function CreateGroupPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [message, setMessage] = useState('');
  
  async function getUsers() {
    const usersData: User[] = await fetch('http://localhost:3004/users', {
      next: { tags: ['users'] }
    })
      .then((res) => res.json());
  
    if (!usersData) {
      return;
    }
   
    setUsers(usersData);
  }
  
  async function updateUser(userUpdated: User) {
    fetch(`http://localhost:3004/users/${userUpdated.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userUpdated),
    });
  }

  async function createGroup(formData: FormData) {
    // To create a new Group, we also need to update the users

    const newUsersIdData = formData.getAll('users').map((userId) => {
      return userId.toString();
    });

    const newUsersIdChecked = newUsersIdData.filter((newUserId) => {
      return newUserId !== '';
    });
    
    // First, parsing the formData with createGroupSchema to ensure the correct Group type
    const parsedGroup = createGroupSchema.safeParse({
      id: crypto.randomUUID(),
      name: formData.get('name'),
      usersId: newUsersIdChecked,
    });

    if (!parsedGroup.success) {
      setMessage('Failed to create group, please check your entries and try again');
      return { message: 'Failed to create group' };
    }
  
    const newGroupData = parsedGroup.data;
    
    // Create the group
    fetch('http://localhost:3004/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGroupData),
    });
    
    // Getting the users IDs to update
    const usersIdsToUpdate = newGroupData.usersId;
    
    usersIdsToUpdate.map(async (userId) => {
      // Get the user by the ID
      const userResponse = await fetch(`http://localhost:3004/users/${userId}`);
      const userToUpdate: User = await userResponse.json();
      
      // Update the usersId list
      const userUpdated = {
        ...userToUpdate,
        groupsId: [...userToUpdate.groupsId, newGroupData.id]
      };
      
      // Update user
      updateUser(userUpdated);
    });
  }
  
  useEffect(() => {getUsers();}, []);

  return (
    <CreateGroupForm action={createGroup}>
      <h1>Create a new group</h1>

      <FormInput>
        <label htmlFor="name">What&apos;s the group&apos;s name?</label>
        <input type="text" id="name" name="name" placeholder="Group's name" required />
      </FormInput>

      <FormInput>
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
      </FormInput>

      <CreateEntityButtonForm />

      {!!message && <span>{message}</span>}
    </CreateGroupForm>
  );
}
