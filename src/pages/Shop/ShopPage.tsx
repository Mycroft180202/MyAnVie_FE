import { useState, useEffect } from 'react';
import { Box, Container, Tab, Tabs } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import PageTransition from '../../components/PageTransition/PageTransition';
import ShopBanner from './Section/ShopBanner';
import ShopProductList from './Section/ShopProductList';
import ShopPagination from './Section/ShopPagination';
import ShopFilters from './Section/ShopFilters';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { Category } from '../../types/category';
import { categoryService } from '../../services/categoryService';
import { productService } from '../../services/productService';
import { Product } from '../../types/product';
import SearchBar from '../../components/SearchBar/SearchBar';
import ScrollToTopButton from '../../components/ScrollToTop/ScrollToTopButton';
import FilterChips from './Section/FilterChips';
import FilterChangeFeedback from './Section/FilterChangeFeedback';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<string>(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || '');
  const [priceRange, setPriceRange] = useState<string>(searchParams.get('price') || '');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response;
        const filters = {
          page: currentPage,
          limit: 9,
          sortBy,
          priceRange,
          search: searchQuery
        };

        if (selectedTab === 'all') {
          response = await productService.getAllProducts(filters);
        } else {
          response = await productService.getProductsByCategory(selectedTab, filters);
        }
        setProducts(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (selectedTab !== 'all') {
      params.set('category', selectedTab);
    } else {
      params.delete('category');
    }
    if (currentPage > 1) {
      params.set('page', currentPage.toString());
    } else {
      params.delete('page');
    }
    if (sortBy) {
      params.set('sort', sortBy);
    } else {
      params.delete('sort');
    }
    if (priceRange) {
      params.set('price', priceRange);
    } else {
      params.delete('price');
    }
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }

    // Update URL without triggering a new fetch
    setSearchParams(params, { replace: true });
    
    // Fetch products
    fetchProducts();
  }, [selectedTab, currentPage, sortBy, priceRange, searchQuery, searchParams, setSearchParams]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSortBy('');
    setPriceRange('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleClearCategory = () => {
    setSelectedTab('all');
    setCurrentPage(1);
  };

  const handleClearSort = () => {
    setSortBy('');
    setCurrentPage(1);
  };

  const handleClearPrice = () => {
    setPriceRange('');
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  if (loading || !products) {
    return <LoadingSpinner minHeight="400px" />;
  }

  return (
    <PageTransition>
      <FilterChangeFeedback loading={loading} />
      <Box sx={{ pb: 6 }}>
        <ShopBanner category={selectedTab} />
        <Container maxWidth="lg">
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            mb: 4,
            mt: 4,
            '& .MuiTabs-flexContainer': {
              justifyContent: 'center',
            }
          }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="product categories"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#666',
                  '&.Mui-selected': {
                    color: '#950B0B',
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#950B0B',
                }
              }}
            >
              <Tab label="Tất cả sản phẩm" value="all" />
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  label={category.name}
                  value={category.name}
                />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 2, 
            mb: 4,
            alignItems: { xs: 'stretch', sm: 'center' },
          }}>
            <SearchBar
              onSearch={handleSearch}
              initialValue={searchQuery}
            />
            <Box sx={{ flex: 1 }}>
              <ShopFilters
                sortBy={sortBy}
                onSortChange={handleSortChange}
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
                onClearFilters={handleClearFilters}
              />
            </Box>
          </Box>

          <FilterChips
            category={selectedTab !== 'all' ? selectedTab : undefined}
            sortBy={sortBy}
            priceRange={priceRange}
            searchQuery={searchQuery}
            onClearCategory={handleClearCategory}
            onClearSort={handleClearSort}
            onClearPrice={handleClearPrice}
            onClearSearch={handleClearSearch}
          />

          <ShopProductList 
            category={selectedTab}
            tab={selectedTab}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onTotalPagesChange={setTotalPages}
          />
          
          {!loading && products && products.length > 0 && (
            <ShopPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </Container>
        <ScrollToTopButton />
      </Box>
    </PageTransition>
  );
};

export default ShopPage;