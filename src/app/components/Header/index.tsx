'use client';
import Image from 'next/image';
import { HeaderContainer } from './styles';
import interNationsLogo from '../../../../public/InterNationsLogo.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const isHomePage = pathname == '/' ? 'active' : '';
  const isGroupsPage = pathname == '/groups' ? 'active' : '';
  
  return (
    <HeaderContainer>
      <Image src={interNationsLogo} alt='InterNations Logo'/>

      <nav>
        <Link href={'/'} className={isHomePage}>Members</Link>
        <Link href={'/groups'} className={isGroupsPage}>Groups</Link>
      </nav>
    </HeaderContainer>
  );
}
