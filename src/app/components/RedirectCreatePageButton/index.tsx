'use client';

import { RedirectButtonContainer } from './styles';

interface CreateEntityButtonProps {
  dataType: 'groups' | 'users'
}

export function RedirectCreatePageButton({ dataType }: CreateEntityButtonProps) {
  const isUsersData = dataType === 'users';
  const createEntityButtonHref = `/${dataType}/create`;
  return (
    <RedirectButtonContainer href={createEntityButtonHref}>
      Create New {isUsersData ? 'User' : 'Group'}
    </RedirectButtonContainer>
  );
}
