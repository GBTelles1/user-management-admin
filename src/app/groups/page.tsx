'use client';
import { MainContainer } from '@/styles/Home';
import { CreateEntityButton } from '../components/CreateUserButton';
import { GroupsDataTable } from '../components/GroupsDataTable';
import { useEffect, useState } from 'react';

interface Group {
  id: string
  name: string
  usersId: string[]
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  
  async function getGroups() {
    const groupsData: Group[] = await fetch('http://localhost:3004/groups')
      .then((res) => res.json());
  
    if (!groupsData) {
      return;
    }
   
    setGroups(groupsData);
  }
  
  useEffect(() => {getGroups();}, []);
  
  return (
    <MainContainer>
      <CreateEntityButton dataType='groups' />
      <GroupsDataTable groups={groups}/>
    </MainContainer>
  );
}
