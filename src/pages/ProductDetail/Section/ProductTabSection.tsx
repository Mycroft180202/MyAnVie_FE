import { Box, Typography, Grid } from '@mui/material';
import { useState } from 'react';
import { Product } from '../../../services/productService';

interface ProductTabSectionProps {
  product: Product;
}

const ProductTabSection: React.FC<ProductTabSectionProps> = ({ product }) => {
  const [tab, setTab] = useState<'description' | 'review'>('description');

  console.log('Current tab:', tab);

  const tabs = [
    { key: 'description', label: 'Mô tả sản phẩm' },
    { key: 'review', label: 'Đánh giá từ khách hàng' },
  ];

  return (
    <Box sx={{ mt: 8 }}>
      {/* Tabs */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        {tabs.map((tabItem) => (
          <Box
            key={tabItem.key}
            sx={{
              width: `${100 / tabs.length}%`,
              textAlign: 'center',
              cursor: 'pointer',
              pb: 1,
              borderBottom: tab === tabItem.key ? '2px solid #950B0B' : '2px solid transparent',
            }}
            onClick={() => setTab(tabItem.key as 'description' | 'review')}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: 500, color: tab === tabItem.key ? '#950B0B' : '#000' }}
            >
              {tabItem.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Content */}
      {tab === 'description' && (
        <Box sx={{ px: { xs: 2, md: 4 }, lineHeight: 1.7 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Typography>
                {product.name} là sản phẩm thuộc danh mục {product.categoryName}. {product.description}
              </Typography>
              <Box mt={2}>
                <Typography fontWeight="bold">Màu sắc:</Typography>
                <Typography>{product.color}</Typography>
                <Typography fontWeight="bold" mt={1}>Chất liệu:</Typography>
                <Typography>Lụa tơ tằm cao cấp, được dệt thủ công tại làng nghề lụa truyền thống Việt Nam. Sản phẩm mang đặc trưng của lụa tự nhiên với bề mặt mềm mại, mịn màng, thoáng mát và có độ bóng nhẹ, tạo cảm giác sang trọng và tinh tế. Chất lụa thân thiện với làn da, không gây kích ứng, phù hợp với mọi loại thời tiết.</Typography>
                <Typography fontWeight="bold" mt={1}>Kiểu dáng:</Typography>
                <Typography>Thiết kế thanh lịch, đa dạng với các mẫu khăn lụa vuông, khăn choàng dài hoặc áo lụa dáng suông. Sản phẩm được chăm chút từng đường kim mũi chỉ, kết hợp hoa văn truyền thống và hiện đại, mang lại vẻ đẹp độc đáo, phù hợp cho cả trang phục thường ngày lẫn dịp đặc biệt.</Typography>
                <Typography fontWeight="bold" mt={1}>Các kích thước:</Typography>
                <Typography>{product.size}</Typography>
                <Typography fontWeight="bold" mt={1}>Công dụng:</Typography>
                <Typography>Trang trí: Khăn lụa có thể sử dụng làm phụ kiện thời trang, tôn lên phong cách cá nhân khi phối cùng áo dài, vest hoặc trang phục công sở.
Quà tặng: Sản phẩm là món quà ý nghĩa, thể hiện sự tinh tế và trân trọng khi dành tặng người thân, bạn bè hoặc đối tác trong các dịp lễ, Tết, kỷ niệm.
Ứng dụng đa năng: Ngoài vai trò phụ kiện, lụa còn được dùng để trang trí không gian, làm khăn trải bàn hoặc rèm cửa nhẹ, mang lại sự sang trọng cho ngôi nhà.</Typography>
              </Box>
              <Typography mt={2} fontWeight="bold">
              Vệ sinh: Giặt tay nhẹ nhàng với nước mát và xà phòng chuyên dụng cho lụa. Tránh ngâm quá lâu hoặc sử dụng chất tẩy mạnh. Không vắt mạnh, chỉ nên bóp nhẹ để loại bỏ nước thừa, sau đó phơi ngang ở nơi thoáng mát, tránh ánh nắng trực tiếp để giữ màu sắc và độ bền của lụa.
              </Typography>
              <Typography>
              Bảo quản: Gấp gọn và cất giữ trong túi vải thoáng khí hoặc hộp sạch để tránh ẩm mốc. Không treo lụa bằng móc kim loại để tránh làm biến dạng sản phẩm. Đặt túi thơm hoặc gói chống ẩm trong nơi bảo quản để duy trì chất lượng lụa lâu dài.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}

      {tab === 'review' && (
        <Box sx={{ px: { xs: 2, md: 4 } }}>
          <Typography variant="h6" mb={2}>
            Đánh giá từ khách hàng (đang cập nhật)
          </Typography>
          <Typography>Chưa có đánh giá nào.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductTabSection;
