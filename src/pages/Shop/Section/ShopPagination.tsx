import { Box, Button } from '@mui/material';
import { useState } from 'react';

interface ShopPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ShopPagination = ({ totalPages, currentPage, onPageChange }: ShopPaginationProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'contained' : 'outlined'}
          onClick={() => onPageChange(page)}
          sx={{
            minWidth: '40px',
            height: '40px',
            borderRadius: '50%',
            bgcolor: page === currentPage ? '#950B0B' : 'transparent',
            color: page === currentPage ? '#fff' : '#000',
            borderColor: '#000',
          }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
};

export default ShopPagination;