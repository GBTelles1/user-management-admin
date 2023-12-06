'use client';
import { MainContainer } from '@/styles/Home';
import { CreateEntityButton } from '../components/CreateUserButton';
import { GroupsDataTable } from '../components/GroupsDataTable';

const groups = [
  {
    id: 1,
    name: 'Gabriel Group',
    users: ['bwrvw23w23f22', 'bwrvw23w23f23', 'bwrvw23w23f24']
  },
  {
    id: 2,
    name: 'Carol Group',
    users: ['bwrvw23w23f23']
  },
  {
    id: 3,
    name: 'Neném Group',
    users: ['bwrvw23w23f22', 'bwrvw23w23f23']
  },
];

export default function GroupsPage() {
  return (
    <MainContainer>
      <CreateEntityButton dataType='groups' />
      <GroupsDataTable groups={groups}/>
    </MainContainer>
  );
}
