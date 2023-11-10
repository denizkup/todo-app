import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import AppProvider from './providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
)
