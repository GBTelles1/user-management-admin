'use server';
import { Community } from '@/interfaces';
import { revalidateTag } from 'next/cache';

export async function updateCommunity(communityUpdated: Community) {
  const url = `http://127.0.0.1:8000/communities/${communityUpdated.id}/`;
  const updateCommunityResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(communityUpdated),
  });

  revalidateTag(`community-${communityUpdated.id}`);

  return updateCommunityResponse;
}
