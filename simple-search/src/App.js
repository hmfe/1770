import React from 'react';
import SearchForm from './components/SearchForm';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    width: 100%;
    color: #000D24;
  }
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  :root {
    --content-width: 400px;
    --content-width-mobile: 300px;
    --content-width-large: 800px;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <h1>Recipe Search</h1>
        <SearchForm />
      </Main>
    </>
  );
}

export default App;
