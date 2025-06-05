import { Box, CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  minHeight?: string | number;
}

const LoadingSpinner = ({ size = 40, minHeight = '200px' }: LoadingSpinnerProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
    >
      <CircularProgress size={size} sx={{ color: '#950B0B' }} />
    </Box>
  );
};

export default LoadingSpinner;