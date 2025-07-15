import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ToastProvider from './components/ToastProvider.jsx'; // Import ToastProvider
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider /> {/* Add ToastProvider here */}
    <App />
  </React.StrictMode>,
)