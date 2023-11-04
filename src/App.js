// src/App.js
import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import StartupQuestions, { Wrapper } from './components/StartupQuestions';
import './App.css';
import DialogflowChatbot from './components/DialogFlowChatBot';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [completedStartup, setCompletedStartup] = useState(false);  // New state variable

  const handleIntroClick = () => {
    setShowIntro(false);
  };

  const handleStartupCompletion = () => {  // New handler function
    setCompletedStartup(true);
  };

  return (
    <Wrapper>
      <DialogflowChatbot></DialogflowChatbot>
      {completedStartup && <DialogflowChatbot />}  {/* Conditionally render based on completedStartup */}
      <div className="App">
        {showIntro ? (
          <IntroScreen onClick={handleIntroClick} />
        ) : (
          <StartupQuestions onCompletion={handleStartupCompletion} /> 
        )}
      </div>
    </Wrapper>
  );
}

export default App;
