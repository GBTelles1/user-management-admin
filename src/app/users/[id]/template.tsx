'use client';
import { useState } from 'react';
import styles from './UserDetailsTemplate.module.css';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

interface ViewEditModeInterface {
  switchModeText: 'Edit' | 'View';
  linkHref: string;
}

interface UserTemplateLayoutProps {
  children: React.ReactNode;
}

export default function UserTemplateLayout({
  children,
}: UserTemplateLayoutProps) {
  const params = useParams<{ id: string }>();
  const currentPathname = usePathname();

  function isViewOrEditMode(): ViewEditModeInterface {
    if (currentPathname === `/users/${params.id}/edit`) {
      return { switchModeText: 'View', linkHref: `/users/${params.id}` };
    }
    return { switchModeText: 'Edit', linkHref: `/users/${params.id}/edit` };
  }

  const [viewEditText, setViewEditText] = useState<ViewEditModeInterface>(() =>
    isViewOrEditMode()
  );

  return (
    <main className={styles.userDetailsMainContainer}>
      <header className={styles.userDetailsHeader}>
        <h1>User Details</h1>

        <Link href={viewEditText.linkHref}>
          {viewEditText.switchModeText} User
        </Link>
      </header>
      {children}
    </main>
  );
}
