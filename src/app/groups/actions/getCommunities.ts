'use server';
import { Community } from '@/interfaces';

export async function getCommunities() {
  const url = 'http://127.0.0.1:8000/communities/';
  const communitiesResponse = await fetch(url, {
    next: { tags: ['communities'] },
  });
  const communitiesData: Community[] = await communitiesResponse.json();

  // If there are no groups, return a empty list
  if (!communitiesData) {
    return [];
  }

  return communitiesData;
}
