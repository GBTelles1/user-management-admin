'use client';
import { MainContainer } from '@/styles/Home';
import { RedirectCreatePageButton } from '../components/RedirectCreatePageButton';
import { GroupsDataTable } from '../components/GroupsDataTable';
import { useEffect, useState } from 'react';
import { Group } from '@/interfaces';

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
      <RedirectCreatePageButton dataType='groups' />
      <GroupsDataTable groups={groups}/>
    </MainContainer>
  );
}
