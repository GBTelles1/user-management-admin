'use server';

import { revalidateCache } from '@/app/revalidateCache';

export async function deleteUser(userId: string) {
  const url = `http://127.0.0.1:8000/users/${userId}/`;
  const deleteUserResponse = await fetch(url, {
    method: 'DELETE',
  });

  revalidateCache('all');

  return deleteUserResponse;
}
