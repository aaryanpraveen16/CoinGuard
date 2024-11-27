import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MnemonicProvider } from './context/MnemonicContext.tsx';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
    <MnemonicProvider>
      <CssBaseline />
      <App />
      </MnemonicProvider>
    </ThemeProvider>
  </StrictMode>,
)
