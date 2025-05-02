import { Box, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ShopFilter = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 5 }}>
      <Typography sx={{ fontSize: 18, fontWeight: 500, mr: 4 }}>Filter</Typography>
      {['Thời gian', 'Khoảng giá', 'Sắp xếp'].map((label) => (
        <Button
          key={label}
          variant="outlined"
          endIcon={<ArrowDropDownIcon />}
          sx={{
            borderRadius: '100px',
            height: 40,
            px: 2,
            borderColor: '#000',
            color: '#ADB6BD',
            textTransform: 'none',
          }}
        >
          {label}
        </Button>
      ))}
      <Button
        variant="outlined"
        sx={{
          minWidth: 'unset',
          width: 32,
          height: 32,
          borderRadius: '100px',
          border: '1px solid #000',
          p: 0,
          ml: 'auto',
        }}
      >
        <CloseIcon sx={{ fontSize: 20, color: '#000' }} />
      </Button>
    </Box>
  );
};

export default ShopFilter;
