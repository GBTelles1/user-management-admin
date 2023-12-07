'use client';
import { useFormStatus } from 'react-dom';
import { CreateEntityButtonContainer } from './styles';


export function CreateEntityButtonForm() {
  const { pending } = useFormStatus();
  return (
    <CreateEntityButtonContainer type='submit' disabled={pending}>
      {pending ? 'Creating...' : 'Create'}
    </CreateEntityButtonContainer>
  );
}
