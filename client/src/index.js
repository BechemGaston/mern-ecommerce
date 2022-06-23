import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreProvider } from './Store';



const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <StoreProvider>
        <BrowserRouter>
            <App tab="home" />
        </BrowserRouter>
    </StoreProvider>
);
