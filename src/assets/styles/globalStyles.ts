import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
    background-color: ${colors.lightGrey};
    color: ${colors.darkGrey};
    margin: 0;
    padding: 0;
    overflow-x: hidden; 
    overflow-y: hidden;
    width:100%;
  }

  h1, h2 {
    color: ${colors.royalBlue};
  } 

  a {
    text-decoration: none;
    color: ${colors.limeGreen};
    font-weight: bold;
  }

  /* Responsive Typography */
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.5rem;
    }
  }
`;

