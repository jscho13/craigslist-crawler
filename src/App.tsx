import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'

const Button = styled.button``

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button>Click me</Button>
      </header>
    </div>
  );
}

export default App;
