import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { categoryService, SubCategory, Category } from '../../services/categoryService';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ShopBanner from './Section/ShopBanner';
import ShopTabs from './Section/ShopTabs';
import ShopFilter from './Section/ShopFilter';
import ShopProductList from './Section/ShopProductList';
import ShopPagination from './Section/ShopPagination';

const ShopPage = () => {
  const { category = 'pottery', subCategoryId } = useParams<{ category: string; subCategoryId?: string }>();
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);

  const normalizedCategory = category.toLowerCase();

  useEffect(() => {
    const fetchCategoriesAndSubCategories = async () => {
      try {
        const allCategories = await categoryService.getCategories();
        const foundCategory = allCategories.find(cat => cat.name.toLowerCase() === normalizedCategory);

        if (foundCategory) {
          setCurrentCategoryId(foundCategory.id);
          const allSubCategories = await categoryService.getSubCategories();
          const filteredSubCategories = allSubCategories.filter(sub => 
            sub.categoryId === foundCategory.id
          );
          setSubCategories(filteredSubCategories);
          
          if (subCategoryId) {
            setSelectedSubCategory(subCategoryId);
          } else if (filteredSubCategories.length > 0) {
            setSelectedSubCategory(filteredSubCategories[0].id);
          }
        } else {
          setSubCategories([]);
          setCurrentCategoryId(null);
          setSelectedSubCategory('');
        }
      } catch (error) {
        console.error('Error fetching categories or subcategories:', error);
      }
    };

    fetchCategoriesAndSubCategories();
  }, [category, subCategoryId, normalizedCategory]);

  const handleSubCategoryChange = (subCategoryId: string) => {
    setSelectedSubCategory(subCategoryId);
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: -1, ml: 15 }}>
        <Breadcrumb
          items={[
            { label: 'Trang chủ', path: '/' },
            { label: category.charAt(0).toUpperCase() + category.slice(1) },
            ...(selectedSubCategory ? [{
              label: subCategories.find(sub => sub.id === selectedSubCategory)?.name || '',
              path: `/shop/${category}/${selectedSubCategory}`
            }] : [])
          ]}
        />
      </Container>

      <Box sx={{ bgcolor: '#FFFCF3', minHeight: '100vh', pb: 2, pt: 2 }}>
        <ShopBanner category={normalizedCategory} />
        <Container maxWidth="lg">
          {subCategories.length > 0 && (
            <ShopTabs
              tab={selectedSubCategory}
              tabs={subCategories.map(sub => ({
                key: sub.id,
                label: sub.name
              }))}
              onTabChange={handleSubCategoryChange}
            />
          )}
          <ShopFilter />
          <ShopProductList
            categoryId={currentCategoryId}
            subCategoryId={selectedSubCategory}
          />
          <ShopPagination />
        </Container>
      </Box>
    </Box>
  );
};

export default ShopPage;
