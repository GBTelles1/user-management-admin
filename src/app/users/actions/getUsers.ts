'use server';

import { User } from '@/interfaces';

export async function getUsers() {
  const url = 'http://127.0.0.1:8000/users/';
  const usersRes = await fetch(url, {
    method: 'GET',
    next: {
      tags: ['users'],
    },
  });

  const usersData: User[] = await usersRes.json();

  if (!usersData) {
    return [];
  }

  return usersData;
}
