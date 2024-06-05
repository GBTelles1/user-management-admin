'use server';
import { User } from '@/interfaces';
import { revalidateTag } from 'next/cache';

export async function getUserById(userId: string) {
  const url = `http://127.0.0.1:8000/users/${userId}/`;
  const userResponse = await fetch(url, {
    method: 'GET',
    next: { tags: [`user-${userId}`] },
  });
  const user: User = await userResponse.json();

  return user;
}
