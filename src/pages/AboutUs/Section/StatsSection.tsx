import { Box, Typography, Grid } from '@mui/material';

const stats = [
  {
    id: 1,
    number: '3',
    description: 'Thoả thuận hợp tác với làng nghề',
  },
  {
    id: 2,
    number: '80+',
    description: 'Hơn 80 mẫu mã sản phẩm độc quyền',
  },
  {
    id: 3,
    number: '100%',
    description: 'Khách hàng hài lòng với chất lượng dịch vụ',
  },
  {
    id: 4,
    number: '150+',
    description: 'Lượt bán chỉ sau 1 tháng hoạt động',
  },
];

const StatsSection = () => {
  return (
    <Box sx={{ py: 10, bgcolor: '#FFF9EC' }}>
      <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 4 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#5B0101',
            mb: 8,
            fontFamily: 'Hoaico2',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          NHỮNG CON SỐ ẤN TƯỢNG
        </Typography>

        <Grid container spacing={4}>
          {/* Image on the left */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/AboutUs/numbers-bg.jpg"
              alt="Impressive numbers"
              sx={{
                width: '500px',
                height: '400px',
                objectFit: 'cover',
                objectPosition: 'top',
                borderRadius: '12px',
                border: '1px solid #000',
                ml: 14,
              }}
            />
          </Grid>

          {/* Stats on the right */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              {stats.map((stat) => (
                <Grid item xs={12} sm={6} key={stat.id}>
                  <Box
                    sx={{
                      textAlign: 'left',
                      height: '100%',
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: '64px',
                        fontWeight: 'bold',
                        letterSpacing: '3px',
                        color: '#5B0101',
                        mb: 1,
                        fontFamily: 'Hoaico2',
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography 
                      sx={{ 
                        fontSize: '18px', 
                        color: '#000',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {stat.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StatsSection;