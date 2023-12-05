import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

// Basic Project Configuration and Layout

// Added:
// - ESLint custom rules
// - Styled components installation with SSR support
// - Theme
// - Global styles
// - Header component
// - First version of README.md

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

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyles;
