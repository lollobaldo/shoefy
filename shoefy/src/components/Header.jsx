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
  const location = useLocation().pathname.split('/');
  console.log(location);
  let headingLine;
  switch (location[1]) {
    case '':
      headingLine = 'Make a Booking';
      break;
    case 'date':
      headingLine = 'Pick a Date';
      break;
    case 'details':
      headingLine = 'Pick a Date';
      break;
    case 'confirmation':
      headingLine = 'Your Confirmation';
      break;
    default:
      headingLine = 'Error';
  }
  return (
    <StyledDiv>
      {headingLine}
    </StyledDiv>
  );
};

export default Header;
