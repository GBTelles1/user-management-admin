import { getUsersByIdList } from '@/app/users/actions';
import { getGroupById } from '../../actions';
import { GroupEditMode } from '../components/GroupEditMode';

interface EditGroupPageProps {
  params: { id: string };
}

export default async function EditGroupPage({ params }: EditGroupPageProps) {
  const currentGroup = await getGroupById(params.id);

  const currentGroupUsers = await getUsersByIdList(currentGroup.usersId);

  return (
    <GroupEditMode
      currentGroup={currentGroup}
      currentGroupUsers={currentGroupUsers}
    />
  );
}
