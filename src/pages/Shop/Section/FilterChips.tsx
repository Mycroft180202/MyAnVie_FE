import { Box, Chip } from '@mui/material';

interface FilterChipsProps {
  category?: string;
  sortBy: string;
  priceRange: string;
  searchQuery: string;
  onClearCategory: () => void;
  onClearSort: () => void;
  onClearPrice: () => void;
  onClearSearch: () => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  category,
  sortBy,
  priceRange,
  searchQuery,
  onClearCategory,
  onClearSort,
  onClearPrice,
  onClearSearch,
}) => {
  const getSortLabel = (sort: string) => {
    switch (sort) {
      case 'price_asc':
        return 'Giá: Thấp đến cao';
      case 'price_desc':
        return 'Giá: Cao đến thấp';
      case 'newest':
        return 'Mới nhất';
      case 'popular':
        return 'Phổ biến nhất';
      default:
        return '';
    }
  };

  const getPriceRangeLabel = (range: string) => {
    switch (range) {
      case '0-500000':
        return 'Dưới 500,000₫';
      case '500000-1000000':
        return '500,000₫ - 1,000,000₫';
      case '1000000-2000000':
        return '1,000,000₫ - 2,000,000₫';
      case '2000000+':
        return 'Trên 2,000,000₫';
      default:
        return '';
    }
  };

  const hasActiveFilters = category || sortBy || priceRange || searchQuery;

  if (!hasActiveFilters) return null;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
      {category && (
        <Chip
          label={`Danh mục: ${category}`}
          onDelete={onClearCategory}
          color="primary"
          sx={{
            bgcolor: '#950B0B',
            '& .MuiChip-deleteIcon': {
              color: 'white',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            },
          }}
        />
      )}
      {sortBy && (
        <Chip
          label={`Sắp xếp: ${getSortLabel(sortBy)}`}
          onDelete={onClearSort}
          color="primary"
          sx={{
            bgcolor: '#950B0B',
            '& .MuiChip-deleteIcon': {
              color: 'white',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            },
          }}
        />
      )}
      {priceRange && (
        <Chip
          label={`Giá: ${getPriceRangeLabel(priceRange)}`}
          onDelete={onClearPrice}
          color="primary"
          sx={{
            bgcolor: '#950B0B',
            '& .MuiChip-deleteIcon': {
              color: 'white',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            },
          }}
        />
      )}
      {searchQuery && (
        <Chip
          label={`Tìm kiếm: ${searchQuery}`}
          onDelete={onClearSearch}
          color="primary"
          sx={{
            bgcolor: '#950B0B',
            '& .MuiChip-deleteIcon': {
              color: 'white',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            },
          }}
        />
      )}
    </Box>
  );
};

export default FilterChips;