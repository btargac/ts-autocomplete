import React from 'react';
import styled from 'styled-components';
import Autocomplete from './components/Autocomplete';

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: white;
  padding: 5rem;
`

const Info = styled.div`
  margin-top: 1em;
  font-style: italic;
`

const Title = styled.h1`
  font-size: 2rem;
`

function App() {
  return (
    <Wrapper>
        <Title>A Simple Autocomplete Component</Title>
        <Autocomplete/>
        <Info>
            Try searching your favorite movies.
        </Info>
    </Wrapper>
  );
}

export default App;
