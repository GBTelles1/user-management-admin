import Link from 'next/link';
import styled from 'styled-components';

export const RedirectButtonContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  background: #1E70A0;
  width: 15.5rem;
  height: 2.5rem;
  border-radius: 10px;

  cursor: pointer;
  
  opacity: 70%;
  
  transition: 1s ease-out;
  &:hover {
    opacity: 100%;
  }

  @media screen and (max-width: 375px) {
    width: 12rem;
    font-size: 0.8rem;
  }

  @media screen and (max-width: 320px) {
    width: 8.5rem;
    font-size: 0.6rem;
  }

`;
