import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';

const StyledDiv = styled.div`
  height: 100px;
  background: #448AFF;
  color: #ffffff;
  font-size: xx-large;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = () => {
  const location = useLocation();
  let headingLine;
  switch (location.pathname) {
    case '/':
      headingLine = 'Make a Booking';
      break;
    default:
      headingLine = 'Your Confirmation';
      break;
    // default:
    //   headingLine = 'Error';
  }
  return (
    <StyledDiv>
      {headingLine}
    </StyledDiv>
  );
};

export default Header;
