import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Dialog,
  IconButton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';

const villages = [
  {
    id: 1,
    name: 'Làng gốm Bát Tràng',
    thumbnail: '/images/AboutUs/village-pottery.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 2,
    name: 'Làng lụa Hà Đông',
    thumbnail: '/images/AboutUs/village-silk.jpg',
    videoUrl: 'https://www.youtube.com/embed/your-video-id-2',
  },
  {
    id: 3,
    name: 'Làng nghề mây tre đan',
    thumbnail: '/images/AboutUs/village-bamboo.jpg',
    videoUrl: 'https://www.youtube.com/embed/your-video-id-3',
  },
];

const VillageVisitSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

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
          CÁC CHUYẾN THĂM LÀNG NGHỀ HỢP TÁC
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
        }}>
          {villages.map((village) => (
            <Box
              key={village.id}
              sx={{
                flex: 1,
              }}
            >
              {/* Video container */}
              <Box
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  '&:hover .play-overlay': {
                    opacity: 1,
                  },
                }}
                onClick={() => handleVideoClick(village.videoUrl)}
              >
                <Box
                  component="img"
                  src={village.thumbnail}
                  alt={village.name}
                  sx={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: '1px solid #000',
                  }}
                />
                {/* Play button overlay */}
                <Box
                  className="play-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    borderRadius: '12px',
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: 60, color: 'white' }} />
                </Box>
              </Box>
              
              {/* Title below video */}
              <Typography
                sx={{
                  textAlign: 'center',
                  mt: 2,
                  fontSize: '18px',
                  fontWeight: 500,
                  color: '#000',
                }}
              >
                {village.name}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Video Dialog */}
        <Dialog
          fullWidth
          maxWidth="md"
          open={Boolean(selectedVideo)}
          onClose={handleCloseVideo}
        >
          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={handleCloseVideo}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white',
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedVideo && (
              <Box
                component="iframe"
                src={selectedVideo}
                sx={{
                  width: '100%',
                  height: '500px',
                  border: 'none',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </Box>
        </Dialog>
      </Container>
    </Box>
  );
};

export default VillageVisitSection;
