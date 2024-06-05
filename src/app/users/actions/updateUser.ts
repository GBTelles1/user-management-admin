'use server';

import { User } from '@/interfaces';
import { revalidateTag } from 'next/cache';

export async function updateUser(userUpdated: User) {
  const url = `http://127.0.0.1:8000/users/${userUpdated.id}/`;
  const updateUserResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userUpdated),
  });

  revalidateTag(`user-${userUpdated.id}`);

  return updateUserResponse;
}
