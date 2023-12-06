import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    color: #ffffff;
    background: #29292E;
  }

  a, button {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyles;
