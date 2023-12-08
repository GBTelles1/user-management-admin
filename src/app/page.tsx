'use client';

import { useEffect, useState } from 'react';
import { MainContainer } from '../styles/Home';
import { RedirectCreatePageButton } from './components/RedirectCreatePageButton';
import { UsersDataTable } from './components/UsersDataTable';
import { User } from '@/interfaces';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  
  async function getUsers() {
    const usersData: User[] = await fetch('http://localhost:3004/users', {
      next: { tags: ['users'] }
    })
      .then((res) => res.json());
  
    if (!usersData) {
      return;
    }
   
    setUsers(usersData);
  }
  
  useEffect(() => {getUsers();}, []);

  return (
    <MainContainer>
      <RedirectCreatePageButton dataType='users' />
      <UsersDataTable users={users} />
    </MainContainer>
  );
}
