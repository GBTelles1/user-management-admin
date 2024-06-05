'use client';
import { useState } from 'react';
import styles from './GroupDetailsTemplate.module.css';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

interface ViewEditModeInterface {
  switchModeText: 'Edit' | 'View';
  linkHref: string;
}

interface UserTemplateLayoutProps {
  children: React.ReactNode;
}

export default function GroupTemplateLayout({
  children,
}: UserTemplateLayoutProps) {
  const params = useParams<{ id: string }>();
  const currentPathname = usePathname();

  function isViewOrEditMode(): ViewEditModeInterface {
    if (currentPathname === `/groups/${params.id}/edit`) {
      return { switchModeText: 'View', linkHref: `/groups/${params.id}` };
    }
    return { switchModeText: 'Edit', linkHref: `/groups/${params.id}/edit` };
  }

  const [viewEditText, setViewEditText] = useState<ViewEditModeInterface>(() =>
    isViewOrEditMode()
  );

  return (
    <main className={styles.groupDetailsMainContainer}>
      <header className={styles.groupDetailsHeader}>
        <h1>Group Details</h1>

        <Link href={viewEditText.linkHref}>
          {viewEditText.switchModeText} Group
        </Link>
      </header>
      {children}
    </main>
  );
}
