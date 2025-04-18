import { Box, Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/ChevronRight'; // dùng icon giống ảnh
import HomeIcon from '@mui/icons-material/Home';

const routeNames: { [key: string]: string } = {
  'about': 'Về chúng tôi',
  'category': 'Danh mục',
  'products': 'Sản phẩm',
  'news': 'Tin tức',
  'profile': 'Hồ sơ',
  'admin': 'Quản trị',
  'login': 'Đăng nhập',
  'register': 'Đăng ký',
  'forgot-password': 'Quên mật khẩu',
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box sx={{ bgcolor: '#fff', py: 2, px: 0, mt: -2, position: 'relative', zIndex: 10 }}>
      <Box
        sx={{
          maxWidth: '1400px',
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          fontSize: '14px',
          color: '#333',
        }}
      >
        <MuiBreadcrumbs
          separator={<NavigateNextIcon fontSize="small" sx={{ color: '#999' }} />}
          aria-label="breadcrumb"
        >
          <Link
            component={RouterLink}
            to="/"
            color="#000"
            sx={{
              fontWeight: 400,
              textDecoration: 'none',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                color: '#950B0B',
              },
            }}
          >
            <HomeIcon sx={{ fontSize: 20 }} />
          </Link>

          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const name = routeNames[value] || value;

            return last ? (
              <Typography
                key={to}
                color="#950B0B"
                sx={{ fontWeight: 500, fontSize: '14px' }}
              >
                {name}
              </Typography>
            ) : (
              <Link
                key={to}
                component={RouterLink}
                to={to}
                color="#000"
                sx={{
                  fontWeight: 400,
                  fontSize: '14px',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#950B0B',
                  },
                }}
              >
                {name}
              </Link>
            );
          })}
        </MuiBreadcrumbs>
      </Box>
    </Box>
  );
};

export default Breadcrumbs;
