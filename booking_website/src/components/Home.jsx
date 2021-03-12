import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

import BG from 'res/try2.png';

const BigContainer = styled.div`
  height: calc(100% - 100px);
  border-radius: 50px 50px 0 0;
  background: url(${BG});
  background: #448AFF;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SummaryP = styled.p`
  color: #fff;
  font-weight: bold;
  font-size: large;
  margin: 0 24px;
`;

const SkaterPic = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 100%;
  background: url(${BG});
  background-size: contain;
  background-position: center 100%;
  background-repeat: no-repeat;
  background-color: #448AFF;
`;

const Submit = styled.button`
  border-radius: 40px;
  background: #448AFF;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  font-size: xx-large;
  outline: none;
  border: 0;
  padding: 16px 32px;
`;

const SubmitWrapper = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`;

const Home = () => {
  const history = useHistory();
  return (
    <BigContainer>
      <SummaryP>
        Challenge your friends and race together. Amuse others with figure skating. Just have fun.
      </SummaryP>
      <SkaterPic src={BG} />
      <SubmitWrapper>
        <Submit className="card" onClick={() => history.push('date')}>Make a Booking</Submit>
      </SubmitWrapper>
    </BigContainer>
  );
};

export default Home;
