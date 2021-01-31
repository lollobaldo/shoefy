import React from 'react';
import styled from 'styled-components/macro';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Header from 'components/Header';
import Home from 'components/Home';
import Booking from 'components/Booking';
import Details from 'components/Details';
import Confirmation from 'components/Confirmation';
import PhoneScreen from 'components/PhoneScreen';

const MainDiv = styled.div`
  height: 100%;
  background: #448AFF;
`;

function App() {
  return (
    <Router>
      <PhoneScreen>
        <MainDiv className="App">
          <Header />
          <Switch>
            <Route path="/date">
              <Booking />
            </Route>
            <Route path="/details/:time">
              <Details />
            </Route>
            <Route path="/confirmation/:time/:name">
              <Confirmation />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </MainDiv>
      </PhoneScreen>
    </Router>
  );
}

export default App;
