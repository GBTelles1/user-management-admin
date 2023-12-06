'use client';

import { MainContainer } from '../styles/Home';
import { CreateEntityButton } from './components/CreateUserButton';
import { UsersDataTable } from './components/UsersDataTable';

const users = [
  {
    id: 'bwrvw23w23f23',
    name: 'Gabriel',
    email: 'gbta@gbt.com',
    groups: [1, 2, 3]
  },
  {
    id: 'bwrvw23w23f22',
    name: 'Carol',
    email: 'carol@gbt.com',
    groups: [1, 3]
  },
  {
    id: 'bwrvw23w23f24',
    name: 'Rafa',
    email: 'rafa@gbt.com',
    groups: [1]
  },
];

export default function Home() {
  return (
    <MainContainer>
      <CreateEntityButton dataType='users' />
      <UsersDataTable data={users} />
    </MainContainer>
  );
}
