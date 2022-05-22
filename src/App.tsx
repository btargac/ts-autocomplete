import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: white;
`

const Title = styled.h1`
  font-size: 2rem;
`

function App() {
  return (
    <Wrapper>
        <Title>Input Component with Autocomplete</Title>
    </Wrapper>
  );
}

export default App;
