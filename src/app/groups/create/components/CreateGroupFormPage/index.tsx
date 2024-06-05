'use client';
import { useFormState } from 'react-dom';
import { submitCreateGroupForm } from '../actions/submitCreateGroupForm';
import styles from './CreateGroupFormPage.module.css';

interface CreateGroupFormPageProps {
  children: React.ReactNode
}

export function CreateGroupFormPage({ children }: CreateGroupFormPageProps) {
  // Message to display when trying to create a new Group
  // It can be a success or an error message
  const initialMessage = '';
  const [message, createGroupFormAction] = useFormState(submitCreateGroupForm, initialMessage);

  return (
    <form className={styles.formWrapper} action={createGroupFormAction}>
      {children}
      <span>{message}</span>
    </form>
  );
}
