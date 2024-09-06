import React from 'react';
import ReactDOM from 'react-dom/client';

import './global.css';

import App from './App';
import { WeatherProvider } from './providers/Weather';
import { ThemeProvider } from './providers/Theme';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </ThemeProvider>
);
