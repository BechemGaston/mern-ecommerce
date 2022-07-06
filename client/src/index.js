import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreProvider } from './Store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';



const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <StoreProvider>
        <BrowserRouter>
          <PayPalScriptProvider deferLoading={true}>
            <App tab="home" />
          </PayPalScriptProvider>
        </BrowserRouter>
    </StoreProvider>
);
