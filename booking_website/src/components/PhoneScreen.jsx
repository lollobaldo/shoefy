import React from 'react';
import styled from 'styled-components/macro';

const StyledAppScreen = styled.div`
  width: 100%;
  height: 100%;

  & #content {
    height: 100%;
  }

  @media (min-width: 400px) {
    overflow: hidden;
    box-sizing: content-box;
    position: relative;
    width: 375px;
    height: 800px;
    margin: auto;
    border: 16px white solid;
    border-radius: 36px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);

    /* The screen (or content) of the device */
    & #content {
      overflow-y: auto;
      width: 375px;
      height: 800px;
      background: #F5F5F5;
    }
  }
`;

// eslint-disable-next-line react/prop-types
const PhoneScreen = ({ children }) => (
  <StyledAppScreen>
    <div id="content">
      {children}
    </div>
  </StyledAppScreen>
);

export default PhoneScreen;
