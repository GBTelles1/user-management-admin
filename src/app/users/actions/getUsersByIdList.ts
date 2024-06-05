'use server';

import { getUserById } from './getUserById';

export async function getUsersByIdList(userIdList: string[]) {
  const users = await Promise.all(
    userIdList.map(async (userId) => {
      return await getUserById(userId);
    })
  );

  // If it's not an Array return []
  if (!users.length) {
    return [];
  }

  return users;
}
