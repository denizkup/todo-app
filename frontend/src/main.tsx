import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import AppProvider from './providers';
import Content from './components/content.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
      <AppProvider>
        <Content>
          <App />
        </Content>
      </AppProvider>
    </ThemeProvider>
)
