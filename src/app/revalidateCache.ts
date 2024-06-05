'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

type RevalidateCacheProps = 'users' | 'groups' | 'all'

export async function revalidateCache(tag?: RevalidateCacheProps) {
  console.log('Revalidating cache');

  switch (tag) {
  case 'users':
    revalidateTag('users');
    break;
  case 'groups':
    revalidateTag('groups');
    break;
  case 'all':
    revalidatePath('/', 'layout');
    break;
  default:
    revalidateTag('users');
    revalidateTag('groups');
    break;
  }
}
