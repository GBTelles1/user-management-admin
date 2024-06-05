'use server';
import { createCommunity } from '@/app/groups/actions';
import { revalidateCache } from '@/app/revalidateCache';
import { updateUser } from '@/app/users/actions';
import { getUserById } from '@/app/users/actions/getUserById';
import { z } from 'zod';

const createGroupSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  usersId: z.array(z.string()),
});
export async function submitCreateGroupForm(previousState: string, formData: FormData) {
  // To create a new Group, we also need to update the users

  const newUsersIdData = formData.getAll('users');

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
    return 'Failed to create group, please check your entries and try again';
  }

  const newGroupData = parsedGroup.data;
  
  // Create the group
  const createGroupResponse = await createCommunity(newGroupData);

  if (createGroupResponse.status !== 201) {
    console.error('Request failed', createGroupResponse.text());
    return 'Failed to create user, please check your entries and try again';
  }
  
  // Getting the users IDs to update
  const usersIdsToUpdate = newGroupData.usersId;
  
  const usersToUpdateList = await Promise.all(
    usersIdsToUpdate.map((userId) => {
      // Get the user by the ID
      return getUserById(userId);
    })
  );
  await Promise.all(
    usersToUpdateList.map((userToUpdate) => {
      // Update the groupsId list
      const userUpdated = { ...userToUpdate,
        groupsId: [...userToUpdate.groupsId, newGroupData.id]
      };    
      
      // Update group
      return updateUser(userUpdated);
    })
  );
  // usersIdsToUpdate.map(async (userId) => {
  //   // Get the user by the ID
  //   const userResponse = await fetch(`http://localhost:3004/users/${userId}`);
  //   const userToUpdate: User = await userResponse.json();
    
  //   // Update the usersId list
  //   const userUpdated = {
  //     ...userToUpdate,
  //     groupsId: [...userToUpdate.groupsId, newGroupData.id]
  //   };
    
  //   // Update user
  //   await updateUser(userUpdated);

  // });
  await revalidateCache();
  return `Group ${newGroupData.name} created`;
}
