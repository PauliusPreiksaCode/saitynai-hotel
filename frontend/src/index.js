import React from 'react';
import "./global.css";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthenticationProvider from './services/authProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TOAST_STYLES from './constants/toastStyle';
import Navbar from './components/header/NavBar';
import Footer from './components/footer/Footer';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <><ToastContainer {...TOAST_STYLES} />
  <AuthenticationProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <App />
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  </AuthenticationProvider>
</>
);