import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from "@material-tailwind/react";
import AppProvider from './hooks';

// const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
)
// <React.StrictMode>
{/* <QueryClientProvider client={queryClient}> */}
{/* </QueryClientProvider> */}
// </React.StrictMode>,
