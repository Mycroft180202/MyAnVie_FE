import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import {
  breadcrumbContainer,
  breadcrumbItem,
  breadcrumbIcon,
  breadcrumbSeparator
} from '../Breadcrumb/Breadcrumb.styles';

type BreadcrumbItem = {
  label: string;
  href?: string; // Nếu có href thì là link
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <Box component="nav" sx={breadcrumbContainer}>
      <Box component="ul" sx={{ display: 'flex', gap: 1, padding: 0, margin: 0, listStyle: 'none' }}>
        {/* Home icon */}
        <Box component="li" sx={breadcrumbItem}>
          <HomeIcon sx={breadcrumbIcon} />
        </Box>

        {/* Items */}
        {items.map((item, index) => (
          <Box component="li" key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Dot separator (không hiển thị trước phần đầu tiên) */}
            <Typography component="span" sx={breadcrumbSeparator}>•</Typography>
            
            {item.href ? (
              <MuiLink href={item.href} underline="none" color="inherit">
                {item.label}
              </MuiLink>
            ) : (
              <Typography>{item.label}</Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Breadcrumb;
