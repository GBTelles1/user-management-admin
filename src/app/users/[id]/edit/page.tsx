import { UserEditMode } from './components/UserEditMode';

interface EditUserPageProps {
  params: { id: string };
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  return <UserEditMode currentUserId={params.id} />;
}
