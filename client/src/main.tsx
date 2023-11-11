import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './context';
import { StyledEngineProvider } from '@mui/material/styles';
import { SnackbarProvider } from './context/SnackbarContext';

// import './assets/styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <SnackbarProvider>
        <AuthProvider>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </AuthProvider>
      </SnackbarProvider>
    </Router>
  </React.StrictMode>,
);
