import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, CardActionArea } from '@mui/material';
import { useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  content: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: 'Nghệ thuật gốm sứ Việt Nam: Từ truyền thống đến hiện đại',
    description: 'Khám phá sự phát triển của nghệ thuật gốm sứ Việt Nam qua các thời kỳ lịch sử.',
    image: '/images/news/pottery.jpg',
    date: '2024-03-29',
    content: 'Nội dung chi tiết về nghệ thuật gốm sứ...'
  },
  {
    id: 2,
    title: 'Làng nghề mây tre đan: Giữ gìn nét đẹp văn hóa dân tộc',
    description: 'Tìm hiểu về các làng nghề mây tre đan truyền thống và sự phát triển trong thời đại mới.',
    image: '/images/news/bamboo.jpg',
    date: '2024-03-28',
    content: 'Nội dung chi tiết về làng nghề mây tre đan...'
  },
  {
    id: 3,
    title: 'Tơ lụa Việt Nam: Di sản văn hóa phi vật thể',
    description: 'Khám phá quy trình sản xuất tơ lụa truyền thống và giá trị văn hóa của nó.',
    image: '/images/news/silk.jpg',
    date: '2024-03-27',
    content: 'Nội dung chi tiết về tơ lụa Việt Nam...'
  }
];

const News = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tin tức & Sự kiện
      </Typography>
      
      <Grid container spacing={4}>
        {mockNews.map((news) => (
          <Grid item xs={12} md={6} lg={4} key={news.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea onClick={() => setSelectedNews(news)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={news.image}
                  alt={news.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {news.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {formatDate(news.date)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {news.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog hiển thị nội dung chi tiết */}
      {selectedNews && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setSelectedNews(null)}
        >
          <Card sx={{ maxWidth: 800, mx: 2 }}>
            <CardMedia
              component="img"
              height="400"
              image={selectedNews.image}
              alt={selectedNews.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="h2">
                {selectedNews.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {formatDate(selectedNews.date)}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedNews.content}
              </Typography>
              <Typography
                variant="button"
                color="primary"
                onClick={() => setSelectedNews(null)}
                sx={{ cursor: 'pointer' }}
              >
                Đóng
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default News; 