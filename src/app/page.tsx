'use client';

import { useEffect, useState } from 'react';
import { MainContainer } from '../styles/Home';
import { CreateEntityButton } from './components/CreateUserButton';
import { UsersDataTable } from './components/UsersDataTable';

interface User {
  id: string;
  name: string;
  email: string;
  groupsId: string[];
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  
  async function getUsers() {
    const usersData: User[] = await fetch('http://localhost:3004/users')
      .then((res) => res.json());
  
    if (!usersData) {
      return;
    }
   
    setUsers(usersData);
  }
  
  useEffect(() => {getUsers();}, []);

  return (
    <MainContainer>
      <CreateEntityButton dataType='users' />
      <UsersDataTable users={users} />
    </MainContainer>
  );
}
