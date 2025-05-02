import { Box, Container, Typography, Grid } from '@mui/material';

const ShowroomSection = () => {
  return (
    <Box sx={{ bgcolor: '#FFF9EC', py: 10 }}>
      <Container maxWidth="lg">
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
          SHOWROOM CỦA MYANVIE
        </Typography>

        <Grid container spacing={4} alignItems="stretch">
          {/* Google Maps */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px',
                  border: '1px solid #000',
                  overflow: 'hidden',
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.785278989428!2d105.83796!3d21.007277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAwJzI2LjIiTiAxMDXCsDUwJzE2LjYiRQ!5e0!3m2!1svi!2s!4v1650268607105!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
              
            </Box>
          </Grid>

          {/* Showroom Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #000',
              }}
            >
              <Box
                component="img"
                src="/images/AboutUs/showroom-2.jpg"
                alt="Showroom MYANVIE Interior"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Typography
                sx={{
                  fontSize : 20,  
                  mt: 2,
                  textAlign: 'center',
                  color: '#000',
                  fontFamily: 'Roboto',
                }}
              >
                📍 Hà Nội
              </Typography>
      </Container>
    </Box>
  );
};

export default ShowroomSection;
