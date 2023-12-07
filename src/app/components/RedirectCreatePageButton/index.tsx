'use client';

import { RedirectButtonContainer } from './styles';

interface RedirectCreatePageButtonProps {
  dataType: 'groups' | 'users'
}

export function RedirectCreatePageButton({ dataType }: RedirectCreatePageButtonProps) {
  const isUsersData = dataType === 'users';
  const createEntityButtonHref = `/${dataType}/create`;
  return (
    <RedirectButtonContainer href={createEntityButtonHref}>
      Create New {isUsersData ? 'User' : 'Group'}
    </RedirectButtonContainer>
  );
}
