import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import QRCode from 'qrcode.react';

import BG from 'res/try3.png';

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
  background-size: cover;
  background-position: center 100%;
  background-repeat: no-repeat;
  background-color: #448AFF;
`;

const QRWrapper = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`;

const Confirmation = () => {
  const { name, time } = useParams();
  const bookingDate = Date.parse(time);
  const dateFormat = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const timeFormat = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: 'numeric',
  });
  const bookingString = `${dateFormat.format(bookingDate)} at ${timeFormat.format(bookingDate)}`;
  return (
    <BigContainer>
      <SummaryP>Hi {name}.<br /> Your booking is confirmed for {bookingString}.<br />
        You can take a screenshot of this page, or bookmark it.
      </SummaryP>
      <SkaterPic src={BG} />
      <QRWrapper>
        <QRCode value={time} />
      </QRWrapper>
    </BigContainer>
  );
};

export default Confirmation;
