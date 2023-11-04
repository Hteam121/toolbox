import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import '../static/ButtonStyles.css'; 
import '../static/Typewriter.css';
import Chatbot from './Chatbot';

const TypewriterText = styled.span.attrs({ className: 'typewriter-text' })`
  display: inline-block;
  max-width: 100%;  // Ensures the width doesn't exceed the parent container
  border-right: .15em solid black;  // Cursor
  overflow: hidden;  // Hide the overflowing text
  white-space: nowrap;  // Keep text in a single line
  margin: 0 auto;  // Center the text
  letter-spacing: .15em;  // Spacing between characters
  font-size: 16pt;
  animation:
    typewriter 3.5s steps(40, end),
    blink 0.75s step-end infinite;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff5e2;
  animation: ${fadeIn} 1s ease-in;
`;

const ContentBox = styled.div`
    border: 4px solid #bda472;
    border-radius: 35px;
    padding: 50px;
    margin-bottom: 20px;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LogoPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  /* Replace with your logo */
  background-image: url('path_to_your_logo.png');
  background-size: cover;
  background-position: center;
`;

const Question = styled.p`
  color: black;
  margin-bottom: 40px;
`;


// Updated Button styled-component
const fadeInButton = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Button = styled.button.attrs({ className: 'button-50' })`
  margin: 10px;
  animation: ${fadeInButton} 1s ease-in;
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const ChatWindow = styled.div`
  width: 300px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StartupQuestions = () => {
  const [step, setStep] = useState(1);
  const [chatWithRealPerson, setChatWithRealPerson] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleRealPersonChoice = () => {
    setChatWithRealPerson(true);
    setStep(step + 1);
  };

  const handleLocationChoice = (enable) => {
    setLocationEnabled(enable);
    setStep(step + 1);
  };

  const renderStep = () => {
    return (
      <>
        {/* <ContentBox> */}
          {step === 1 && (
            <>
              <Question><TypewriterText>Do you want to chat with AI, or talk to someone else?</TypewriterText></Question>
              <ButtonsWrapper>
                <Button onClick={handleRealPersonChoice}>Talk to someone else</Button>
                <Button onClick={handleRealPersonChoice}>Talk to AI</Button>
              </ButtonsWrapper>
            </>
          )}
          {step === 2 && (
            <>
              <Question><TypewriterText>Do you want to enable location to talk to others near you?</TypewriterText></Question>
              <ButtonsWrapper>
                <Button onClick={() => handleLocationChoice(true)}>Yes</Button>
                <Button onClick={() => handleLocationChoice(false)}>No</Button>
              </ButtonsWrapper>
            </>
          )}
          {step === 3 && <ChatWindow><Chatbot completedStartup={true} /></ChatWindow>}
        {/* </ContentBox> */}
      </>
    );
  };
  
  return <Wrapper>{renderStep()}</Wrapper>;
};

export { Wrapper };
export default StartupQuestions;
