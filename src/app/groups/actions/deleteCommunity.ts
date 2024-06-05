'use server';
export async function deleteCommunity(communityId: string) {
  const url = `http://127.0.0.1:8000/communities/${communityId}/`;
  const deleteCommunityResponse = await fetch(url, {
    method: 'DELETE',
  });

  return deleteCommunityResponse;
}
