'use client';
import { MainContainer } from '@/styles/Home';
import { CreateUserButton } from './components/CreateUserButton';

export default function Home() {
  return (
    <MainContainer>
      <CreateUserButton />
    </MainContainer>
  );
}
