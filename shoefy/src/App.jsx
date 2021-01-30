import React from 'react';
import styled from 'styled-components/macro';

import Booking from 'components/Booking';
import Header from 'components/Header';

const MainDiv = styled.div`
  height: 100%;
  background: #448AFF;
`;

function App() {
  return (
    <MainDiv className="App">
      <Header />
      <Booking />
    </MainDiv>
  );
}

export default App;
