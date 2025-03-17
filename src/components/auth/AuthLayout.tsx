import { Box, Container, Paper } from '@mui/material';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        py: 8,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
