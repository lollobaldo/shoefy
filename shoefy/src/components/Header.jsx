import React from 'react';
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
  console.log('ciao');
  return (
    <StyledDiv>
      Make a booking
    </StyledDiv>
  );
};

export default Header;
