import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import Calendar from 'react-calendar';

import { Shake } from 'components/animations';

import './calendar.css';

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

// eslint-disable-next-line react/prop-types
const Datecomp = ({ date, onChange }) => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <Calendar
      onClickDay={onChange}
      value={date}
      minDate={new Date()}
      formatShortWeekday={(locale, d) => days[d.getDay()]}
      prev2Label={null}
      next2Label={null} />
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
  border: 1px solid transparent;
  font-weight: bold;

  &.active {
    border: 1px solid #448AFF;
  }
`;

const TimeCont = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const format = (h, m) => {
  const hh = h < 10 ? `0${h}` : h;
  const mm = m < 10 ? `0${m}` : m;
  return `${hh}:${mm}`;
};

// eslint-disable-next-line react/prop-types
const TimeComp = ({ time, onChange }) => {
  const items = [];
  for (let hour = 10; hour < 19; hour += 1) {
    items.push([hour, 0]);
    items.push([hour, 30]);
  }
  return (
    <TimeCont>
      {items.map(([h, m]) => (
        <TimeBtn
          className={time && h === time[0] && m === time[1] ? 'active' : 'cc'}
          key={[h, m]}
          onClick={() => onChange([h, m])}>
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
  padding: 16px 32px;
`;

const ShakeExt = styled(Shake)`
  max-height: 40%;
  overflow-y: scroll;
  margin: 16px 0;
  z-index: 1;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: #E3F2FD;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #448AFF;
  }
`;

const Booking = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [timeError, setTimeError] = useState(false);

  const history = useHistory();

  const submit = () => {
    if (!time) { setTimeError(true); return; }
    const bookingDate = date;
    bookingDate.setHours(time[0]);
    bookingDate.setMinutes(time[1]);
    const url = encodeURI(bookingDate.toISOString());
    history.push(`details/${url}`);
  };

  return (
    <BigContainer>
      <Datecomp date={date} onChange={setDate} />
      <ShakeExt
        playState={timeError ? 'running' : 'none'}
        onAnimationEnd={() => setTimeError(false)}>
        <TimeComp time={time} onChange={setTime} />
      </ShakeExt>
      <Submit className="card" onClick={submit}>Insert Details</Submit>
    </BigContainer>
  );
};

export default Booking;
