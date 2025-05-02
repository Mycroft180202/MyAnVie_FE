import { Box } from '@mui/material';

const ShopPagination = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
      {[1, 2, 3].map((page) => (
        <Box
          key={page}
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            bgcolor: page === 2 ? '#000' : '#ccc',
            cursor: 'pointer',
          }}
        />
      ))}
    </Box>
  );
};

export default ShopPagination;
