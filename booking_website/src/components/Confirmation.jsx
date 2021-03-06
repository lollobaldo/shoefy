import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

// import QRCode from 'qrcode.react';

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
  height: 250px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`;

const Confirmation = () => {
  const { name, time, email, size } = useParams();
  const [qr, setQr] = useState();
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

  useEffect(() => {
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://api.shoefy.xereeto.co.uk/booking/', true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    const payload = {
      startTime: Math.floor(bookingDate / 1000),
      endTime: Math.floor(bookingDate / 1000) + 3600,
      name,
      email,
      shoeSizes: [+size],
    };
    console.log(payload);
    // console.log(xhr);
    // xhr.send(payload);
    fetch('https://api.shoefy.xereeto.co.uk/booking/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.qr);
        setQr(data.qr);
      }).catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookingString = `${dateFormat.format(bookingDate)} at ${timeFormat.format(bookingDate)}`;
  return (
    <BigContainer>
      <SummaryP>Hi {name}.<br /> Your booking is confirmed for {bookingString}.<br />
        You can take a screenshot of this page, or bookmark it.
      </SummaryP>
      <SkaterPic src={BG} />
      <QRWrapper>
        {/* {qr} */}
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(qr)}`} alt="qr code" style={{ height: '200px' }} />
        {/* <img src={qr} alt="qr code" /> */}
        {/* <QRCode value={time} /> */}
      </QRWrapper>
    </BigContainer>
  );
};

export default Confirmation;
