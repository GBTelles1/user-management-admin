'use client';

import { useEffect, useState } from 'react';
import { PageTitle, UserDetailsContainer, UserDetailsHeader } from './styles';
import { UserViewMode } from './components/UserViewMode';
import { UserEditMode } from './components/UserEditMode';
import { Group, User } from '@/interfaces';

interface UserDetailsPageProps {
  params: { id: string }
}

export default function UserDetailsPage({ params }: UserDetailsPageProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const switchModeButtonText = editMode ? 'View' : 'Edit';

  const userId = params.id;

  const [currentUser, setCurrentUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    groupsId: [''],
  });
  
  const [currentUserGroups, setCurrentUserGroups] = useState<Group[]>([]);

  async function getUser(userId: string) {
    const fetchUserResponse = await fetch(`http://localhost:3004/users/${userId}`);
    const user: User= await fetchUserResponse.json();
 
    setCurrentUser(user);
    return user;
  }

  async function getGroups(groupIdList: string[]) {
    groupIdList.map(async (groupId) => {
      const fetchGroupResponse = await fetch(`http://localhost:3004/groups/${groupId}`);
      const group: Group= await fetchGroupResponse.json();

      setCurrentUserGroups((previousState) => [...previousState, group]);
    });
  }

  useEffect(() => {
    if (currentUser.id === '') {
      getUser(userId).then((user) => {
        getGroups(user.groupsId);
      });
    }
  }, [userId, currentUser]);

  return (
    <UserDetailsContainer>
      <UserDetailsHeader>
        <PageTitle>
          User Details: {currentUser.name}
        </PageTitle>

        <button onClick={() => setEditMode((previousState) => !previousState)}>
          {switchModeButtonText} User
        </button>
      </UserDetailsHeader>

      {!editMode && 
        <UserViewMode
          currentUser={currentUser}
          currentUserGroups={currentUserGroups}
        />      
      }

      {!!editMode && 
        <UserEditMode
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          currentUserGroups={currentUserGroups}
        />
      }
    </UserDetailsContainer>
  );
}
