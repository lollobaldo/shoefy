import React from 'react';
import styled from 'styled-components/macro';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Header from 'components/Header';
import Booking from 'components/Booking';
import Confirmation from 'components/Confirmation';

const MainDiv = styled.div`
  height: 100%;
  background: #448AFF;
`;

function App() {
  return (
    <Router>
      <MainDiv className="App">
        <Header />
        <Switch>
          <Route path="/:id">
            <Confirmation />
          </Route>
          <Route path="/">
            <Booking />
          </Route>
        </Switch>
      </MainDiv>
    </Router>
  );
}

export default App;
