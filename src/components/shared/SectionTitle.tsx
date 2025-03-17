import { Typography, Box } from '@mui/material';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionTitle = ({ title, subtitle, centered = false }: SectionTitleProps) => {
  return (
    <Box 
      sx={{ 
        mb: 6,
        textAlign: centered ? 'center' : 'left'
      }}
    >
      <Typography 
        variant="h2" 
        component="h2" 
        sx={{ 
          color: 'primary.main',
          mb: subtitle ? 2 : 0,
          fontWeight: 'bold'
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ maxWidth: centered ? '600px' : 'none', mx: centered ? 'auto' : 0 }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;
