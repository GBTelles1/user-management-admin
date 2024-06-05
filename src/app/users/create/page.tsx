import { CreateUserForm } from './components/CreateUserForm';
import { CreateUserFormPage } from './components/CreateUserFormPage';

/**
 * Create User page, it contains a form to create the new user
 */
export default function CreateUserPage() {
  return (
    // CreateUserFormPage is a form inside a Client Component
    // It is a Client Component to display a message based on the form status
    <CreateUserFormPage>
      <CreateUserForm />
    </CreateUserFormPage>
  );
}
