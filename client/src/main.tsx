import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';

// Replace with your actual Clerk frontend API key
const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkFrontendApi) {
  throw new Error('Missing Publishable Key');
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
