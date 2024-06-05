'use server';

import { getCommunityById } from './getCommunityById';

export async function getCommunitiesByIdList(communityIdList: string[]) {
  const communities = await Promise.all(
    communityIdList.map(async (communityId) => {
      return await getCommunityById(communityId);
    })
  );

  // If it's not an Array return []
  if (!communities.length) {
    return [];
  }

  return communities;
}
