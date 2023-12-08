'use client';

import { useEffect, useState } from 'react';
import { PageTitle, UserDetailsContainer, UserDetailsHeader } from './styles';
import { GroupViewMode } from './components/GroupViewMode';
import { GroupEditMode } from './components/GroupEditMode';
import { Group, User } from '@/interfaces';

interface GroupDetailsPageProps {
  params: { id: string }
}

export default function GroupDetailsPage({ params }: GroupDetailsPageProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const switchModeButtonText = editMode ? 'View' : 'Edit';

  const groupId = params.id;

  const [currentGroup, setCurrentGroup] = useState<Group>({
    id: '',
    name: '',
    usersId: [''],
  });
  
  const [currentGroupUsers, setCurrentGroupUsers] = useState<User[]>([]);

  async function getGroup(groupId: string) {
    const fetchGroupResponse = await fetch(`http://localhost:3004/groups/${groupId}`);
    const group: Group= await fetchGroupResponse.json();
 
    setCurrentGroup(group);
    return group;
  }

  async function getUsers(userIdList: string[]) {
    userIdList.map(async (userId) => {
      const fetchUserResponse = await fetch(`http://localhost:3004/users/${userId}`);
      const user: User= await fetchUserResponse.json();

      setCurrentGroupUsers((previousState) => [...previousState, user]);
    });
  }

  useEffect(() => {
    if (currentGroup.id === '') {
      getGroup(groupId).then((group) => {
        getUsers(group.usersId);
      });
    }
  }, [groupId, currentGroup]);

  return (
    <UserDetailsContainer>
      <UserDetailsHeader>
        <PageTitle>
          Group Details: {currentGroup.name}
        </PageTitle>

        <button onClick={() => setEditMode((previousState) => !previousState)}>
          {switchModeButtonText} Group
        </button>
      </UserDetailsHeader>

      {!editMode && 
        <GroupViewMode
          currentGroup={currentGroup}
          currentGroupUsers={currentGroupUsers}
        />      
      }

      {!!editMode && 
        <GroupEditMode
          currentGroup={currentGroup}
          setCurrentGroup={setCurrentGroup}
          currentGroupUsers={currentGroupUsers}
        />
      }
    </UserDetailsContainer>
  );
}
