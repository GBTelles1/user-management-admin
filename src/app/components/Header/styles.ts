import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: #202024;
  padding: 2.5rem 5rem;
  margin-bottom: 2rem;

  display: flex;
  justify-content: space-between;
  gap: 1rem;

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    
    a {
      border-top: 2px solid transparent;
      border-bottom: 2px solid transparent;

      transition: 0.8s ease-out;

      &.active {
        border-width: 100%;
        border-bottom: 2px solid #1E70A0;
      }

      &:hover {
        border-bottom: 2px solid #FFFFFF;
  
      }
    }    
  }


  @media screen and (max-width: 375px) {
    padding: 1.5rem 4rem;
  }

  @media screen and (max-width: 320px) {
    padding: 0.5rem 3rem;
    font-size: 0.8rem;

    img {
      width: 30px;
    }
  }

`;
