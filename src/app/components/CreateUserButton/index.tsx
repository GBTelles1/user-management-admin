'use client';

import { CreateUserButtonContainer } from './styles';

interface CreateEntityButtonProps {
  dataType: 'groups' | 'users'
}

export function CreateEntityButton({ dataType }: CreateEntityButtonProps) {
  const isUsersData = dataType === 'users';
  return (
    <CreateUserButtonContainer>
      Create New {isUsersData ? 'User' : 'Group'}
    </CreateUserButtonContainer>
  );
}
