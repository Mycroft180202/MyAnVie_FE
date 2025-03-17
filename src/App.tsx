import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { theme } from './styles/theme';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter >
          <AppRoutes />
      </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
