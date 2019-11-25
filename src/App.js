import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const SNIPPETS = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hangout? The Foo Bar'
  ];
  const INITIAL_GAME_STATE = {victory: false, startTime: null, endTime: null};
  const [snippet, setSnippet] = useState('');
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState('');

  useEffect(() => {
    if(gameState.victory) document.title='Victory!';
  })

  const updateUserText = event => {
    setUserText(event.target.value);
    if (event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime 
      });
    }
  };

  const chooseSnippet = snippetIndex => () => {
    console.log('setSnippet', snippetIndex);
    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({...gameState, startTime: new Date().getTime()});
  };

  return (
    <div>
      <h2 className='title'>Type Race</h2>
      <hr />
      <h3 className='title'>Snippet</h3>
      {snippet}
      <h4 className='victory'>{gameState.victory ? `Done! 🎉 Time: ${gameState.endTime}ms` : null}</h4>
      <input className='typeBar' value={userText} onChange={updateUserText} />
      <hr />
      {
        SNIPPETS.map((SNIPPET, index) => (
          <button onClick={chooseSnippet(index)} key={index}>
            {SNIPPET.substring(0, 10)}...
          </button>
        ))
      }  
    </div>
  );
}

export default App;
