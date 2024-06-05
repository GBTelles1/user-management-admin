'use client';

import { useFormState } from 'react-dom';
import { submitUpdateGroupForm } from '../actions/submitUpdateGroupForm';
import styles from './UpdateGroupFormPage.module.css';

interface UpdateGroupFormPageProps {
  children: React.ReactNode;
}

export function UpdateGroupFormPage({ children }: UpdateGroupFormPageProps) {
  // Message to display when trying to create a new Group
  // It can be a success or an error message
  const initialMessage = '';
  const [message, updateGroupFormAction] = useFormState(
    submitUpdateGroupForm,
    initialMessage
  );

  // const updateGroupFormActionWithId = updateGroupFormAction.bind(null, groupId);
  return (
    // It displays the message based on the form status
    <form className={styles.updateGroupForm} action={updateGroupFormAction}>
      {children}
      <span>{message}</span>
    </form>
  );
}
