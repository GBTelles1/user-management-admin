import styled from 'styled-components';

export const CreateUserButtonContainer = styled.button`
  background: #1E70A0;
  width: 15.5rem;
  height: 2.5rem;
  border-radius: 10px;

  cursor: pointer;

  opacity: 70%;

  &:hover {
    opacity: 100%;
  }

  @media screen and (max-width: 375px) {
    width: 12rem;
  }

  @media screen and (max-width: 320px) {
    width: 8.5rem;
  }

  transition: 1s ease-out;
`;
