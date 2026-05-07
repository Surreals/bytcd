import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/space-grotesk';
import '@fontsource/instrument-serif';
import '@fontsource/instrument-serif/400-italic.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ToastProvider from './components/ToastProvider.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider /> {/* Add ToastProvider here */}
    <App />
  </React.StrictMode>,
)