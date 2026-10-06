import React from 'react';
import { AppProvider } from '@/context/AppContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Main from '@/pages/Main';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <AppProvider>
        <Main />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
