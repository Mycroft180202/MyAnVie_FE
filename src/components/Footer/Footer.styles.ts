export const footerContainer = {
  bgcolor: '#FFFFFF',
  py: 4,
  mt: 'auto'
};

export const logoStyle = {
  height: 100,
  width: 'auto',
  mb: 1
};

export const sectionTitle = {
  fontWeight: 'bold',
  mb: 2
};

export const contactItem = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1
};

export const socialIcon = {
  width: 24,
  height: 24
};

export const subscribeField = {
  bgcolor: 'white',
  maxWidth: 400,
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#950B0B' },
    '&:hover fieldset': { borderColor: '#950B0B' },
    '&.Mui-focused fieldset': { borderColor: '#950B0B' }
  },
  '& .MuiInputBase-input': {
    fontSize: '14px',
    padding: '10px'
  }
};

export const subscribeButton = {
  bgcolor: '#950B0B',
  color: 'white',
  width: '200px',
  '&:hover': { bgcolor: '#7A0909' },
  fontSize: '10px',
  fontWeight: 'bold',
  padding: '10px 20px'
};

export const footerDivider = {
  mt: 4,
  pt: 2,
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  fontSize: '0.875rem'
};
