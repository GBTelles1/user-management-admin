'use server';

export async function submitUpdateGroupForm(
  previousState: string,
  formData: FormData
) {
  // To create update a Group, we also need to update the users

  // Validating the Group's usersId list
  const newUsersIdData = formData.getAll('users').map((userId) => {
    return userId.toString();
  });

  const newUsersIdChecked = newUsersIdData.filter((newUserId) => {
    return newUserId !== '';
  });

  // Getting group's usersId list updated
  const usersIdUpdated = getUsersIdUpdated(newUsersIdChecked);

  // First, parsing the formData with updateUserSchema to ensure the User type
  const parsedGroup = updateGroupSchema.safeParse({
    id: currentGroup.id,
    name: formData.get('name'),
    usersId: usersIdUpdated,
  });

  if (!parsedGroup.success) {
    setMessage('Failed to save group, please check your entries and try again');
    return { message: 'Failed to save group' };
  }

  const updatedGroup = parsedGroup.data;

  // Update the user
  // setCurrentGroup(updatedGroup);
  await updateGroup(updatedGroup)
    .then(() => {
      setMessage('Saved!');
    })
    .catch(() =>
      setMessage(
        'Failed to save group, please check your entries and try again'
      )
    );

  // Update users
  newUsersIdChecked.map(async (userId) => {
    // Get the group by the ID
    const userResponse = await fetch(`http://localhost:3004/users/${userId}`);
    const userToUpdate: User = await userResponse.json();

    // Update the groupsId list
    const userUpdated = {
      ...userToUpdate,
      groupsId: [...userToUpdate.groupsId, updatedGroup.id],
    };

    // Update user
    await updateUser(userUpdated);
  });
}
