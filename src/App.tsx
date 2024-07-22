import React from 'react';
import logo from './logo.svg';
import './App.css';
import StepperForm from './components/StepperForm';
import { DataProvider } from '../src/components/DataContext';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <React.StrictMode>
      <DataProvider>
        <StepperForm/>
      </DataProvider>
  </React.StrictMode>
  );
}

export default App;