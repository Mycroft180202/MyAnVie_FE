import { Box, Button, Typography, Popover, MenuItem, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';

export interface FilterOptions {
  sortBy?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  timeRange?: string;
}

interface ShopFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const ShopFilter = ({ onFilterChange }: ShopFilterProps) => {
  const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({});
  const [filters, setFilters] = useState<FilterOptions>({});
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLElement>, label: string) => {
    setAnchorEls({ ...anchorEls, [label]: event.currentTarget });
  };

  const handleClose = (label: string) => {
    setAnchorEls({ ...anchorEls, [label]: null });
  };

  const handleFilterSelect = (label: string, value: any) => {
    const newFilters = { ...filters };
    
    switch (label) {
      case 'Thời gian':
        newFilters.timeRange = value;
        break;
      case 'Khoảng giá':
        if (priceMin && priceMax) {
          newFilters.priceRange = {
            min: Number(priceMin),
            max: Number(priceMax)
          };
        }
        break;
      case 'Sắp xếp':
        newFilters.sortBy = value;
        break;
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
    handleClose(label);
  };

  const handleClearFilters = () => {
    setFilters({});
    setPriceMin('');
    setPriceMax('');
    onFilterChange({});
  };

  const getFilterContent = (label: string) => {
    switch (label) {
      case 'Thời gian':
        return [
          'Mới nhất',
          'Cũ nhất'
        ].map((option) => (
          <MenuItem 
            key={option} 
            onClick={() => handleFilterSelect(label, option)}
            selected={filters.timeRange === option}
          >
            {option}
          </MenuItem>
        ));
      
      case 'Khoảng giá':
        return (
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Giá thấp nhất"
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              size="small"
            />
            <TextField
              label="Giá cao nhất"
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              size="small"
            />
            <Button 
              variant="contained" 
              onClick={() => handleFilterSelect(label, true)}
              disabled={!priceMin || !priceMax}
            >
              Áp dụng
            </Button>
          </Box>
        );
      
      case 'Sắp xếp':
        return [
          'Giá tăng dần',
          'Giá giảm dần',
          'Tên A-Z',
          'Tên Z-A'
        ].map((option) => (
          <MenuItem 
            key={option} 
            onClick={() => handleFilterSelect(label, option)}
            selected={filters.sortBy === option}
          >
            {option}
          </MenuItem>
        ));
      
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 5 }}>
      <Typography sx={{ fontSize: 18, fontWeight: 500, mr: 40 }}>Filter</Typography>
      {['Thời gian', 'Khoảng giá', 'Sắp xếp'].map((label) => (
        <Box key={label}>
          <Button
            onClick={(e) => handleClick(e, label)}
            variant="outlined"
            endIcon={<ArrowDropDownIcon />}
            sx={{
              borderRadius: '100px',
              height: 40,
              px: 2,
              borderColor: filters[label as keyof FilterOptions] ? '#1976d2' : '#000',
              color: filters[label as keyof FilterOptions] ? '#1976d2' : '#ADB6BD',
              textTransform: 'none',
            }}
          >
            {label}
          </Button>
          <Popover
            open={Boolean(anchorEls[label])}
            anchorEl={anchorEls[label]}
            onClose={() => handleClose(label)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {getFilterContent(label)}
          </Popover>
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={handleClearFilters}
        sx={{
          minWidth: 'unset',
          width: 32,
          height: 32,
          borderRadius: '100px',
          border: '1px solid #000',
          p: 0,
          ml: 'auto',
        }}
      >
        <CloseIcon sx={{ fontSize: 20, color: '#000' }} />
      </Button>
    </Box>
  );
};

export default ShopFilter;
