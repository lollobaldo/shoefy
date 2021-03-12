import styled, { keyframes } from 'styled-components/macro';

export const shakeKey = keyframes`
  8%, 41% {
    transform: translateX(-10px);
  }
  25%, 58% {
    transform: translateX(10px);
  }
  75% {
    transform: translateX(-5px);
  }
  92% {
    transform: translateX(5px);
  }
  0%, 100% {
    transform: translateX(0);
  }
`;

export const Shake = styled.div`
  z-index: 1;
  animation: ${({ playState }) => (playState === 'none' ? 'none' : shakeKey)} .5s linear;
  animation-play-state: ${({ playState }) => playState};
`;
