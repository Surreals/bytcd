import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ToastProvider from './components/ToastProvider.jsx';
import CustomCursorProvider from './components/CustomCursorProvider.jsx'; // Import CustomCursorProvider
import './index.css';
import WebFont from 'webfontloader'; // Import WebFontLoader

// Load Google Fonts
WebFont.load({
  google: {
    families: ['Plus Jakarta Sans']
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider />
    <CustomCursorProvider> {/* Wrap App with CustomCursorProvider */}
      <App />
    </CustomCursorProvider>
  </React.StrictMode>,
);