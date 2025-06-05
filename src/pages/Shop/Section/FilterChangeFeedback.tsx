import { LinearProgress, Box, Fade } from '@mui/material';

interface FilterChangeFeedbackProps {
  loading: boolean;
}

const FilterChangeFeedback = ({ loading }: FilterChangeFeedbackProps) => {
  return (
    <Fade in={loading} unmountOnExit>
      <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1100 }}>
        <LinearProgress
          sx={{
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#950B0B',
            },
            backgroundColor: 'rgba(149, 11, 11, 0.1)',
          }}
        />
      </Box>
    </Fade>
  );
};

export default FilterChangeFeedback;