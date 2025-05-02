import { Box, Typography } from '@mui/material';

const ShopTabs = ({
  tab,
  onTabChange,
}: {
  tab: 'do-gia-dung' | 'binh-lo';
  onTabChange: (tab: 'do-gia-dung' | 'binh-lo') => void;
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
      {['do-gia-dung', 'binh-lo'].map((key) => (
        <Box
          key={key}
          sx={{
            width: '50%',
            textAlign: 'center',
            cursor: 'pointer',
            pb: 1,
            borderBottom: tab === key ? '2px solid #950B0B' : '2px solid transparent',
          }}
          onClick={() => onTabChange(key as 'do-gia-dung' | 'binh-lo')}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 500, color: tab === key ? '#950B0B' : '#000' }}>
            {key === 'do-gia-dung' ? 'Đồ gia dụng' : 'Bình, Lọ'}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ShopTabs;
