'use client';
import { useEffect, useState } from 'react';
import { CreateUserForm, FormInput } from './styles';
import { z } from 'zod';
import { CreateEntityButtonForm } from '../../components/CreateEntityButtonForm';
import { Group } from '@/interfaces';

const createUserSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  groupsId: z.array(z.string()).nonempty(),
});

export default function CreateUserPage() {
  const [groups, setGroups] = useState<Group[]>([]);

  const [message, setMessage] = useState('');
  
  async function getGroups() {
    const groupsData: Group[] = await fetch('http://localhost:3004/groups')
      .then((res) => res.json());
  
    if (!groupsData) {
      return;
    }
   
    setGroups(groupsData);
  }
  
  
  async function updateGroup(groupUpdated: Group) {
    fetch(`http://localhost:3004/groups/${groupUpdated.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupUpdated),
    });
  }

  async function createUser(formData: FormData) {
    // To create a new User, we also need to update the groups

    // First, parsing the formData with createUserSchema to ensure the User type
    const parsedUser = createUserSchema.safeParse({
      id: crypto.randomUUID(),
      name: formData.get('name'),
      email: formData.get('email'),
      groupsId: formData.getAll('groups'),
    });

    if (!parsedUser.success) {
      setMessage('Failed to create todo, please check your entries and try again');
      return { message: 'Failed to create todo' };
    }
  
    const newUserData = parsedUser.data;

    // Create the user
    fetch('http://localhost:3004/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    });

    // Getting the groups IDs to update
    const groupsIdsToUpdate = newUserData.groupsId;

    groupsIdsToUpdate.map(async (groupId) => {
      // Get the group by the ID
      const groupResponse = await fetch(`http://localhost:3004/groups/${groupId}`);
      const groupToUpdate: Group = await groupResponse.json();

      // Update the usersId list
      const groupUpdated = { ...groupToUpdate,
        usersId: [...groupToUpdate.usersId, newUserData.id]
      };

      // Update group
      updateGroup(groupUpdated);

    });
  }

  useEffect(() => {getGroups();}, []);
  return (
    <CreateUserForm action={createUser}>
      <h1>Create a new user</h1>

      <FormInput>
        <label htmlFor="name">What&apos;s your name?</label>
        <input type="text" id="name" name="name" placeholder="Your name" required />
      </FormInput>
      
      <FormInput>
        <label htmlFor="email">What&apos;s your email?</label>
        <input type="text" id="email" name="email" placeholder="Your email" required />
      </FormInput>

      <FormInput>
        <label htmlFor="groups">What&apos;s(&apos;re) your(s) group(s)?</label>
        <select id="groups" name="groups" required >
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

      <CreateEntityButtonForm />

      {!!message && <span>{message}</span>}
    </CreateUserForm>
  );
}
