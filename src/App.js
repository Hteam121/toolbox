// src/App.js
import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import StartupQuestions, { Wrapper } from './components/StartupQuestions';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroClick = () => {
    setShowIntro(false);
  };

  return (
    <Wrapper>
      <div className="App">
        {showIntro ? (
          <IntroScreen onClick={handleIntroClick} />
        ) : (
          <StartupQuestions />
        )}
      </div>
    </Wrapper>
  );
}

export default App;
