import React from 'react';
import styled, { keyframes } from 'styled-components';

const bouncing = keyframes`
  from {
      opacity: 1;
      transform: translateY(0);
  }
  to {
      opacity: 0.1;
      transform: translateY(-1rem);
  }
`;

const StyledLoader = styled.div`
  height: calc(100vh - 56px);
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: #2196f3;
    border-radius: 50%;
    animation: ${bouncing} 0.6s infinite alternate;

    &:nth-of-type(2) {
      animation-delay: 0.2s;
    }

    &:nth-of-type(3) {
      animation-delay: 0.4s;
    }
  }
`;

const Loader = () => (
  <StyledLoader>
    <div />
    <div />
    <div />
  </StyledLoader>
);

export default Loader;
