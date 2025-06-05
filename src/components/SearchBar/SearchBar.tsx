import { useState, useEffect } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import useDebounce from '../../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  debounceDelay?: number;
}

const SearchBar = ({ 
  onSearch, 
  placeholder = 'Tìm kiếm sản phẩm...', 
  initialValue = '',
  debounceDelay = 300 
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const debouncedSearchQuery = useDebounce(searchQuery, debounceDelay);

  useEffect(() => {
    onSearch(debouncedSearchQuery.trim());
  }, [debouncedSearchQuery, onSearch]);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: { xs: '100%', sm: 400 },
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        px: 2,
        '&:hover': {
          borderColor: '#950B0B',
        },
        transition: 'border-color 0.2s ease',
      }}
    >
      <InputBase
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        sx={{
          flex: 1,
          '& input': {
            py: 1,
          },
        }}
      />
      {searchQuery && (
        <IconButton 
          size="small" 
          onClick={handleClear}
          sx={{ 
            mr: 0.5,
            color: 'text.secondary',
            '&:hover': {
              color: '#950B0B',
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
      <SearchIcon 
        sx={{ 
          color: searchQuery ? '#950B0B' : 'text.secondary',
          transition: 'color 0.2s ease',
        }}
      />
    </Box>
  );
};

export default SearchBar;