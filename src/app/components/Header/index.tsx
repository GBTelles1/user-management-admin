'use client';
import Image from 'next/image';
import { HeaderContainer } from './styles';
import interNationsLogo from '../../../../public/InterNationsLogo.svg';
import Link from 'next/link';

export function Header() {
  return (
    <HeaderContainer>
      <Image src={interNationsLogo} alt=''/>
      <nav>
        <Link href={'/'}>Members</Link>
        <Link href={'/groups'}>Groups</Link>
      </nav>
    </HeaderContainer>
  );
}
