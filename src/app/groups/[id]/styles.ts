import styled from 'styled-components';

export const UserDetailsContainer = styled.main`
  padding: 0 5rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-weight: 400;
  }
`;

export const UserDetailsHeader = styled.header`
   display: flex;
   justify-content: space-between;

   button {
    background: #1E70A0;
    padding: 1rem;
    border-radius: 8px;
    font-size: 1rem;

    cursor: pointer;

    opacity: 70%;

    transition: 1s ease-out;
    &:hover {
      opacity: 100%;
    }
   }
`;

export const PageTitle = styled.h1`
  margin-bottom: 1rem;
`;
