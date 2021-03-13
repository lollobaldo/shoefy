import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import { Shake } from 'components/animations';

import 'components/creditCard.css';

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

const Group = styled.div`
  padding: 8px;
  width: 100%;
`;

// eslint-disable-next-line react/prop-types
const TextInput = ({ name, label, value, onChange, onFocus, style, ...conf }) => {
  const [focus, setFocus] = useState(false);
  return (
    <StyledField className={focus ? 'focussed card' : 'card'} style={style}>
      <StyledInput
        id={name} name={name} type="text" value={value} placeholder={label} {...conf}
        onChange={onChange}
        onFocus={(e) => {
          setFocus(true);
          onFocus(e);
        }}
        onBlur={() => setFocus(false)} />
      <label htmlFor={name}>
        {label}
      </label>
    </StyledField>
  );
};

const CreditCard = () => {
  const [state, setState] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    console.log(state);
    setState({ ...state, [name]: value });
  };

  const nameError = false;

  return (
    <div id="PaymentForm">
      <Cards
        cvc={state.cvc}
        expiry={state.expiry}
        focused={state.focus}
        name={state.name}
        number={state.number} />
      <Group>
        <p>What&apos;s your name?</p>
        <Shake
          playState={nameError ? 'running' : 'none'}
          onAnimationEnd={() => {}}>
          <TextInput
            name="name" label="Full Name" value={state.name}
            onChange={handleInputChange} onFocus={handleInputFocus} />
        </Shake>
      </Group>
      <Group>
        {/* <p>What&apos;s your name?</p> */}
        <Shake
          playState={nameError ? 'running' : 'none'}
          onAnimationEnd={() => {}}>
          <TextInput
            name="number" label="Number" type="number" value={state.number}
            onChange={handleInputChange} onFocus={handleInputFocus} />
        </Shake>
      </Group>
      <Group>
        {/* <p>What&apos;s your name?</p> */}
        <Shake
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'cemter' }}
          playState={nameError ? 'running' : 'none'}
          onAnimationEnd={() => {}}>
          <TextInput
            style={{ display: 'inline-block', width: '60%' }}
            name="expiry" label="Expiration dd/mm" type="text" pattern="\d\d/\d\d" maxLength="4" value={state.expiry}
            onChange={handleInputChange} onFocus={handleInputFocus} />
          <TextInput
            style={{ display: 'inline-block', width: '30%', margin: '0 0 0 auto' }}
            name="cvc" label="CVC" type="text" pattern="\d\d\d" maxLength="3" value={state.cvc}
            onChange={handleInputChange} onFocus={handleInputFocus} />
        </Shake>
      </Group>
    </div>
  );
};

export default CreditCard;
