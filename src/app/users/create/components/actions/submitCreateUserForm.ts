"use server";

import { z } from "zod";
import { createUser } from "@/app/users/actions";
import { getGroupById, updateGroup } from "@/app/groups/actions";
import { revalidateCache } from "@/app/revalidateCache";

// Schema to create a new User
const createUserSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email("Email not valid"),
  groupsId: z.array(z.string()).nonempty(),
});
// This creates a new User and update the groups
export async function submitCreateUserForm(
  previousState: string,
  formData: FormData,
) {
  // Submitting user form data
  const userFormData = {
    id: crypto.randomUUID(),
    name: formData.get("name"),
    email: formData.get("email"),
    groupsId: formData.getAll("groups"),
  };

  // First, parsing the formData with createUserSchema to ensure the User type
  const parsedUser = createUserSchema.safeParse(userFormData);

  if (!parsedUser.success) {
    console.error("Parse error", parsedUser.error.format());
    return "Failed to create user, please check your entries and try again";
  }

  // Saving the parsed user data as newUserData
  const newUserData = parsedUser.data;

  // Creating new user
  const createUserResponse = await createUser(newUserData);

  if (createUserResponse.status !== 201) {
    console.error("Request failed", createUserResponse.text());
    return "Failed to create user, please check your entries and try again";
  }

  // To create a new User, we also need to update the groups
  // Getting the groups IDs to update
  const groupsIdsToUpdate = newUserData.groupsId;

  const groupsToUpdateList = await Promise.all(
    groupsIdsToUpdate.map((groupId) => {
      // Get the group by the ID
      return getGroupById(groupId);
    }),
  );
  await Promise.all(
    groupsToUpdateList.map((groupToUpdate) => {
      // Update the usersId list
      const groupUpdated = {
        ...groupToUpdate,
        usersId: [...groupToUpdate.usersId, newUserData.id],
      };

      // console.log({ groupToUpdate });
      console.log({ groupUpdated });

      // Update group
      return updateGroup(groupUpdated);
    }),
  );
  // groupsIdsToUpdate.forEach(async (groupId) => {
  //   try {
  //     // Get the group by the ID
  //     const groupToUpdate = await getGroupById(groupId);

  //     // Update the usersId list
  //     const groupUpdated = { ...groupToUpdate,
  //       usersId: [...groupToUpdate.usersId, newUserData.id]
  //     };

  //     // console.log({ groupToUpdate });
  //     console.log({ groupUpdated });

  //     // Update group
  //     await updateGroup(groupUpdated);
  //   } catch (error) {
  //     console.error(`Error while updating group ${groupId}`, error);
  //   }
  // });

  // Revalidating 'users' and 'groups' cache
  await revalidateCache();

  return `User ${newUserData.name} created!`;
}
