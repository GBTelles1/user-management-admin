'use client';
import { deleteCommunity } from '@/app/groups/actions';
import { DeleteButton } from './styles';
import { useState } from 'react';
import { deleteUser } from '@/app/users/actions';

type EntityTypes = 'user' | 'group';

interface DeleteEntityProps {
  currentEntityId: string;
  entityType: EntityTypes;
}

interface DeleteEntityButtonProps
  extends React.ComponentProps<'button'>,
    DeleteEntityProps {}

export function DeleteEntityButton({
  currentEntityId,
  entityType,
  ...props
}: DeleteEntityButtonProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const buttonText = (isDeleting: boolean, entityType: EntityTypes) => {
    if (isDeleting) {
      return 'Deleting';
    }

    return `Delete ${entityType}`;
  };

  const handleDeleteEntity = async ({
    currentEntityId,
    entityType,
  }: DeleteEntityProps) => {
    setIsDeleting(true);

    if (entityType === 'user') {
      await deleteUser(currentEntityId);
    }

    if (entityType === 'group') {
      await deleteCommunity(currentEntityId);
    }

    setIsDeleting(false);
  };

  return (
    <DeleteButton
      onClick={() => handleDeleteEntity({ currentEntityId, entityType })}
      disabled={isDeleting}
      {...props}
    >
      {buttonText(isDeleting, entityType)}
    </DeleteButton>
  );
}
