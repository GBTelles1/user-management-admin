'use server';
import { User } from '@/interfaces';

export async function createUser(newUserData: User) {
  const url = 'http://127.0.0.1:8000/users/';
  const createUserResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: [`user-${newUserData.id}`] },
    body: JSON.stringify(newUserData),
  });

  return createUserResponse;
}
