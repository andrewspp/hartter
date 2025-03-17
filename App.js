import React from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/common/navigation/navigation';
import ThemeToggle from './components/common/themeToggle/ThemeToggle';
import ScrollIndicator from './components/common/ScrollIndicator/ScrollIndicator';
import Header from './components/sections/Header/Header';
import About from './components/sections/About/About';
import Works from './components/sections/Works/Works';
import Artists from './components/sections/Artists/Artists';
import Exhibitions from './components/sections/Exhibitions/Exhibitions';
import CursorTrail from './components/effects/CursorTrail/CursorTrail';

function App() {
  return (
    <ThemeProvider>
      <Navigation />
      <ThemeToggle />
      <ScrollIndicator />
      <Header />
      <About />
      <Works />
      <Artists />
      <Exhibitions />
      <CursorTrail />
    </ThemeProvider>
  );
}

export default App;