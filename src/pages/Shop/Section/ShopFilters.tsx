import { Box, FormControl, Select, MenuItem, SelectChangeEvent, Button, useTheme, useMediaQuery } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface ShopFiltersProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  onClearFilters: () => void;
}

const ShopFilters: React.FC<ShopFiltersProps> = ({
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSortChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value);
  };

  const handlePriceRangeChange = (event: SelectChangeEvent) => {
    onPriceRangeChange(event.target.value);
  };

  const showClearButton = sortBy || priceRange;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        mb: 4,
        px: 2,
        py: 2,
        bgcolor: '#fff',
        borderRadius: 1,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        alignItems: { xs: 'stretch', sm: 'center' },
      }}
    >
      <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 200 } }}>
        <Select
          value={sortBy}
          onChange={handleSortChange}
          displayEmpty
          sx={{
            '& .MuiSelect-select': {
              color: '#666',
            },
          }}
        >
          <MenuItem value="">Sắp xếp theo</MenuItem>
          <MenuItem value="price_asc">Giá: Thấp đến cao</MenuItem>
          <MenuItem value="price_desc">Giá: Cao đến thấp</MenuItem>
          <MenuItem value="newest">Mới nhất</MenuItem>
          <MenuItem value="popular">Phổ biến nhất</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 200 } }}>
        <Select
          value={priceRange}
          onChange={handlePriceRangeChange}
          displayEmpty
          sx={{
            '& .MuiSelect-select': {
              color: '#666',
            },
          }}
        >
          <MenuItem value="">Khoảng giá</MenuItem>
          <MenuItem value="0-500000">Dưới 500,000₫</MenuItem>
          <MenuItem value="500000-1000000">500,000₫ - 1,000,000₫</MenuItem>
          <MenuItem value="1000000-2000000">1,000,000₫ - 2,000,000₫</MenuItem>
          <MenuItem value="2000000+">Trên 2,000,000₫</MenuItem>
        </Select>
      </FormControl>

      {showClearButton && (
        <Button
          startIcon={<RestartAltIcon />}
          onClick={onClearFilters}
          size="small"
          fullWidth={isMobile}
          sx={{
            color: '#666',
            '&:hover': {
              color: '#950B0B',
            },
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}
        >
          Xóa bộ lọc
        </Button>
      )}
    </Box>
  );
};

export default ShopFilters;