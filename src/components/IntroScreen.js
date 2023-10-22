// src/components/IntroScreen.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '../img/logo.png';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const bobbing = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: ${fadeIn} 2s ease-in;
  cursor: pointer;
`;

const Logo = styled.div`
  width: 700px;
  height: 400px;
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
  animation: ${fadeIn} 2s ease-in;
`;

const Text = styled.p`
  font-size: 24px;
  text-align: center;
  animation: ${bobbing} 2s infinite ease-in-out;
`;

const IntroScreen = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <Logo />
      <Text>Click to Begin</Text>
    </Wrapper>
  );
};

export default IntroScreen;
