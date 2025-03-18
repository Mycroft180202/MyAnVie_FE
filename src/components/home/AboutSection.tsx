import { Container, Grid, Box, Typography } from '@mui/material';
import SectionTitle from '../shared/SectionTitle';

const AboutSection = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
      <Container>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/about-image.jpg"
              alt="Về MyAnVie"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SectionTitle 
              title="Câu chuyện về MYANVIE"
              subtitle="Nơi hội tụ tinh hoa nghề thủ công Việt Nam"
            />
            <Typography paragraph>
            Từ những lò nung rực lửa ở Bát Tràng, những khung cửi miệt mài của làng lụa Vạn Phúc đến những nghệ nhân cặm cụi vót tre, đan mây, các làng nghề thủ công Việt Nam đã lưu giữ tinh hoa qua bao thế hệ. Mỗi sản phẩm không chỉ là một món đồ sử dụng hằng ngày mà còn chứa đựng câu chuyện của bàn tay người thợ, của truyền thống và sự sáng tạo.
MYANVIE ra đời để tiếp nối những giá trị ấy, mang đến những sản phẩm thủ công tinh xảo từ gốm, lụa, mây tre đan – không chỉ giữ nguyên nét đẹp truyền thống mà còn phù hợp với không gian sống hiện đại. Những chiếc đèn mây thanh thoát, những món đồ décor từ tre, những chiếc bình gốm hay tấm lụa mềm mại, tất cả đều được làm từ tâm huyết của nghệ nhân, từ những chất liệu tự nhiên, bền vững.
            </Typography>
            <Typography paragraph>
            Chúng tôi tin rằng mỗi sản phẩm thủ công không chỉ có giá trị sử dụng mà còn là sự kết nối giữa con người với văn hóa, giữa quá khứ và hiện tại. MYANVIE mang tinh hoa làng nghề đến gần hơn với bạn, để nét đẹp Việt không chỉ dừng lại ở một miền ký ức mà còn hiện diện trong từng không gian sống, từng câu chuyện đời thường.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
