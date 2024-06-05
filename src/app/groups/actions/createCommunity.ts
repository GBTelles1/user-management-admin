'use server';
import { Community } from '@/interfaces';

export async function createCommunity(newCommunityData: Community) {
  const url = 'http://127.0.0.1:8000/communities/';
  const createCommunityResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: [`community-${newCommunityData.id}`] },
    body: JSON.stringify(newCommunityData),
  });

  return createCommunityResponse;
}
