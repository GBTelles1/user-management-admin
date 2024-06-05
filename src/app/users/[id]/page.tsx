import { UserViewMode } from './components/UserViewMode';
import { getUserById } from '../actions/getUserById';
import { getGroupsByIdList } from '@/app/groups/actions';

interface UserDetailsPageProps {
  params: { id: string };
}

export default async function UserDetailsPage({
  params,
}: UserDetailsPageProps) {
  const userId = params.id;
  const currentUser = await getUserById(userId);

  const currentUserGroups = await getGroupsByIdList(currentUser.groupsId);

  return (
    <UserViewMode
      currentUser={currentUser}
      currentUserGroups={currentUserGroups}
    />
  );
}
