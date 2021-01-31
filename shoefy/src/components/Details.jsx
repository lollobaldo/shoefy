import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import { Shake } from 'components/animations';

const StyledField = styled.div`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  border: 1px solid #448AFF;
  position: relative;
  background-color: rgba(255,255,255,0.3);
  transition: 0.3s all;

  &:hover {
    background-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  }

  &.focussed {
    background-color: #ffffff;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
  }

  &.focussed input {
    padding: 24px 16px 8px 16px;
  }

  &.focussed input + label {
    top: 4px;
    opacity: 1;
    color: #448AFF;
  }

  &.focussed input {
    padding: 24px 16px 8px 16px;
  }
  & input + label {
    position: absolute;
    top: 24px;
    left: 16px;
    font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif;
    font-size: 12px;
    font-weight: 600;
    line-height: 24px;
    color: #448AFF;
    opacity: 0;
    pointer-events: none;
    transition: 0.1s all ease-in-out;
  }

  & input::input-placeholder { color: rgba(68, 138, 255, 0.8); }
  & input::-webkit-input-placeholder { color: rgba(68, 138, 255, 0.8); }
  & input::-moz-placeholder { color: rgba(68, 138, 255, 0.8); }
  & input:-ms-input-placeholder { color: rgba(68, 138, 255, 0.8); }
  & input:-moz-placeholder { color: rgba(68, 138, 255, 0.8); }

  &.focussed input::input-placeholder { color: rgba(68, 138, 255, 0); }
  &.focussed input::-webkit-input-placeholder { color: rgba(68, 138, 255, 0); }
  &.focussed input::-moz-placeholder { color: rgba(68, 138, 255, 0); }
  &.focussed input:-ms-input-placeholder { color: rgba(68, 138, 255, 0); }
  &.focussed input:-moz-placeholder { color: rgba(68, 138, 255, 0); }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  position: relative;
  padding: 0px 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  background-color: transparent;
  color: #282828;
  outline: none;
  box-shadow: 0px 4px 20px 0px transparent;
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out, 0.1s padding ease-in-out;
  -webkit-appearance: none;
`;

// eslint-disable-next-line react/prop-types
const TextInput = ({ name, label, value, onChange }) => {
  const [focus, setFocus] = useState(false);
  return (
    <StyledField className={focus ? 'focussed card' : 'card'}>
      <StyledInput
        id={name} type="text" value={value} placeholder={name}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)} />
      <label htmlFor={name}>
        {name}
      </label>
    </StyledField>
  );
};

const SizeBtn = styled.button`
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

const SizeCont = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

// eslint-disable-next-line react/prop-types
const SizeComp = ({ selected, onChange }) => {
  const items = [];
  for (let size = 25; size <= 45; size += 1) {
    items.push(size);
  }
  return (
    <SizeCont>
      {items.map((size) => (
        <SizeBtn
          className={size === selected ? 'active' : 'cc'}
          key={size} type="button"
          onClick={() => onChange(size)}>
          {size}
        </SizeBtn>
      ))}
    </SizeCont>
  );
};

const BigContainer = styled.form`
  height: calc(100% - 100px);
  border-radius: 50px 50px 0 0;
  background: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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

const Group = styled.div`
  padding: 8px;
  width: 100%;
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

const Details = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [size, setSize] = useState('');
  const [sizeError, setSizeError] = useState(false);

  const history = useHistory();
  const { time } = useParams();

  const submit = () => {
    console.log(email, name, size);
    if (!name) { setNameError(true); return; }
    if (!email) { setEmailError(true); return; }
    if (!size) { setSizeError(true); return; }
    const newUrl = `/confirmation/${time}/${name}`;
    console.log(newUrl);
    history.push(newUrl);
  };

  return (
    <BigContainer autoComplete="off">
      {/* <form autoComplete="off"> */}
      <Group>
        <p>What&apos;s your name?</p>
        <Shake
          playState={nameError ? 'running' : 'none'}
          onAnimationEnd={() => setNameError(false)}>
          <TextInput name="Name" value={name} onChange={setName} />
        </Shake>
      </Group>
      <Group>
        <p>What&apos;s your email?</p>
        <Shake
          playState={emailError ? 'running' : 'none'}
          onAnimationEnd={() => setEmailError(false)}>
          <TextInput name="Email" value={email} onChange={setEmail} />
        </Shake>
      </Group>
      <ShakeExt
        playState={sizeError ? 'running' : 'none'}
        onAnimationEnd={() => setSizeError(false)}>
        <SizeComp selected={size} onChange={setSize} />
      </ShakeExt>
      <Submit className="card" onClick={submit} type="button">Insert Details</Submit>
      {/* </form> */}
    </BigContainer>
  );
};

export default Details;
