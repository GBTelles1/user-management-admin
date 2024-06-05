'use server';

import { z } from 'zod';

const updateUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  groupsId: z.array(z.string()).nonempty(),
});

export async function submitUpdateUserForm(
  previousState: string,
  formData: FormData
) {
  // To create update a User, we also need to update the groups

  // Getting and validating the User's groupsId list
  const newGroupsIdData = formData.getAll('groups').map((groupId) => {
    return groupId.toString();
  });

  const newGroupsIdChecked = newGroupsIdData.filter((newGroupId) => {
    return newGroupId !== '';
  });

  const currentUserGroups = formData
    .getAll('currentUserGroups')
    .map((groupId) => {
      return groupId.toString();
    });

  // Getting user's groupsId list updated
  const groupsIdUpdated = [...currentUserGroups, ...newGroupsIdChecked];

  const userId = formData.get('userId');

  // First, parsing the formData with updateUserSchema to ensure the User type
  const parsedUser = updateUserSchema.safeParse({
    id: userId,
    name: formData.get('name'),
    email: formData.get('email'),
    groupsId: groupsIdUpdated,
  });

  if (!parsedUser.success) {
    return 'Failed to save user, please check your entries and try again';
  }

  const updatedUser = parsedUser.data;
  console.log({ updatedUser });

  // Update the user
  // setCurrentUser(updatedUser);

  // const updatedUserResponse = await updateUser(updatedUser);

  // .then(() => {
  //   setMessage("Saved!");
  // })
  // .catch(() =>
  //   setMessage(
  //     "Failed to save user, please check your entries and try again",
  //   ),
  // );

  // if (updatedUserResponse.status !== 201) {
  //   console.error("Request failed", updatedUserResponse.text());
  //   return "Failed to update user, please check your entries and try again";
  // }

  // Is no longer necessary to update the groups, when using Django REST Backend
  // // Update groups
  // await Promise.all(
  //   newGroupsIdData.map(async (groupId) => {
  //     // Get the group by the ID
  //     const groupResponse = await fetch(
  //       `http://localhost:3004/groups/${groupId}`,
  //     );
  //     const groupToUpdate: Group = await groupResponse.json();

  //     // Update the usersId list
  //     const groupUpdated = {
  //       ...groupToUpdate,
  //       usersId: [...groupToUpdate.usersId, updatedUser.id],
  //     };

  //     // Update group
  //     await updateGroup(groupUpdated);
  //   }),
  // );
  return `User ${updatedUser.name} updated!`;
}
