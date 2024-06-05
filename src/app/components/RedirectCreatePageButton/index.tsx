import Link from 'next/link';
import styles from './RedirectCreatePageButton.module.css';

interface RedirectCreatePageButtonProps {
  dataType: 'groups' | 'users'
}

export function RedirectCreatePageButton({ dataType }: RedirectCreatePageButtonProps) {
  const isUsersData = dataType === 'users';
  const createEntityButtonHref = `/${dataType}/create`;

  return (
    <Link className={styles.redirectButton} href={createEntityButtonHref}>
      Create New {isUsersData ? 'User' : 'Group'}
    </Link>
  );
}
