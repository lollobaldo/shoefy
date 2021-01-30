import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';

import QRCode from 'qrcode.react';

import BG from 'res/femaleiceskater.svg';

import './calendar.scss';

const BigContainer = styled.div`
  height: calc(100% - 100px);
  border-radius: 50px 50px 0 0;
  background: url(${BG});
  background: #448AFF;
  background-size: cover;
  background-position: center;
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
  background-position: center;
`;

const QRWrapper = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
`;

const Booking = () => {
  const location = useLocation().pathname.substring(1);
  const bookingDate = Date.parse(location);
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
      <SummaryP>Your booking is confirmed for {bookingString}.</SummaryP>
      <SkaterPic src={BG} />
      <QRWrapper>
        <QRCode value={location} />
      </QRWrapper>
    </BigContainer>
  );
};

export default Booking;
