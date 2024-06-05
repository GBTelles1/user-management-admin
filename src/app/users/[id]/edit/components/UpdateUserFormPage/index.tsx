'use client';

import { useFormState } from 'react-dom';
import { submitUpdateUserForm } from '../actions/submitUpdateUserForm';

interface UpdateUserFormPageProps {
  children: React.ReactNode;
}

export function UpdateUserFormPage({ children }: UpdateUserFormPageProps) {
  // Message to display when trying to create a new User
  // It can be a success or an error message
  const initialMessage = '';
  const [message, updateUserFormAction] = useFormState(
    submitUpdateUserForm,
    initialMessage
  );

  return (
    // It displays the message based on the form status
    <form className={''} action={updateUserFormAction}>
      {children}
      <span>{message}</span>
    </form>
  );
}
