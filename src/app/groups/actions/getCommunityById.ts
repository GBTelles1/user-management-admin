'use server';
import { Community } from '@/interfaces';

export async function getCommunityById(communityId: string) {
  const url = `http://127.0.0.1:8000/communities/${communityId}/`;
  const communityResponse = await fetch(url, {
    method: 'GET',
    next: { tags: [`community-${communityId}`] },
  });
  const community: Community = await communityResponse.json();

  return community;
}
