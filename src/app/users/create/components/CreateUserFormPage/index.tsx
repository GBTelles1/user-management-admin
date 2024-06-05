'use client';
import { useFormState } from 'react-dom';
import { submitCreateUserForm } from '../actions/submitCreateUserForm';
import styles from './CreateUserFormPage.module.css';

interface CreateUserFormPageProps {
  children: React.ReactNode
}

/**
 * Form wrapper that shows a message based on the form state
 * @param {React.ReactNode} children - Must be the CreateUserForm component
 * @returns The CreateUserForm component within a form state message
 */
export function CreateUserFormPage({ children }: CreateUserFormPageProps) {
  // Message to display when trying to create a new User
  // It can be a success or an error message
  const initialMessage = '';
  const [message, createUserFormAction] = useFormState(submitCreateUserForm, initialMessage);

  return (
    // It displays the message based on the form status
    <form className={styles.formWrapper} action={createUserFormAction}>
      {children}
      <span>{message}</span>
    </form>
  );
}
