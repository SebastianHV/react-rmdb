import React from 'react';
// Compoenents
import Header from './components/Header'; // Module imported with ES6 Syntax
import Home from './components/Home';

// Styles
import { GlobalStyle } from './GlobalStyle'

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <GlobalStyle />
    </div>
  );
}

export default App;
