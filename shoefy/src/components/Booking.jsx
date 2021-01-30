import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Calendar from 'react-calendar';

import './calendar.scss';

const BigContainer = styled.div`
  height: calc(100% - 100px);
  border-radius: 50px 50px 0 0;
  background: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const DateCont = styled.div`
  height: 40%;
`;

const Datecomp = () => {
  const [value, onChange] = useState(new Date());
  const hh = (e) => {
    console.log(e);
    onChange(e);
  };
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <DateCont>
      <Calendar
        onClickDay={hh}
        value={value}
        formatShortWeekday={(locale, date) => days[date.getDay()]}
        prev2Label={null}
        next2Label={null} />
    </DateCont>
  );
};

const TimeBtn = styled.button`
  width: 25%;
  flex-grow: 1;
  color: #448AFF;
  background: #E3F2FD;
  padding: 16px;
  margin: 8px;
  outline: none;
  border: 0;
  font-weight: bold;
`;

const TimeCont = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-height: 40%;
  overflow: scroll;
`;

const format = (h, m) => {
  const hh = h < 10 ? `0${h}` : h;
  const mm = m < 10 ? `0${m}` : m;
  return `${hh}:${mm}`;
};

const TimeComp = () => {
  const items = [];
  for (let hour = 10; hour < 19; hour += 1) {
    items.push([hour, 0]);
    items.push([hour, 30]);
  }
  // eslint-disable-next-line no-unused-vars
  const [time, setTime] = useState();
  return (
    <TimeCont>
      {items.map(([h, m]) => (
        <TimeBtn
          key={[h, m]}
          onClick={() => setTime([h, m])}>
          {format(h, m)}
        </TimeBtn>
      ))}
    </TimeCont>
  );
};

const Submit = styled.button`
  border-radius: 40px;
  background: #448AFF;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  font-size: xx-large;
  outline: none;
  border: 0;
  padding: 16px;
`;

const Booking = () => {
  console.log('ciao');
  return (
    <BigContainer>
      <Datecomp />
      <TimeComp />
      <Submit className="card" onClick={() => {}}>Confirm Booking</Submit>
    </BigContainer>
  );
};

export default Booking;
