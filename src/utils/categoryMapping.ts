export const categoryMapping: Record<
  string,
  {
    label: string;
    tabs: { key: string; label: string }[];
    bannerImages: string[];
  }
> = {
  pottery: {
    label: 'Gốm',
    tabs: [
      { key: 'do-gia-dung', label: 'Đồ gia dụng' },
      { key: 'binh-lo', label: 'Bình, Lọ' },
    ],
    bannerImages: [
      '/images/products/Pottery1.jpg',
      '/images/products/Pottery2.jpg',
      '/images/products/Pottery3.jpg',
    ],
  },
  silk: {
    label: 'Lụa',
    tabs: [
      { key: 'khăn-lua', label: 'Khăn lụa' },
      { key: 'vay-ao-lua', label: 'Váy, Áo lụa' },
    ],
    bannerImages: [
      '/images/products/Silk1.jpg',
      '/images/products/Silk2.jpg',
      '/images/products/Silk3.jpg',
    ],
  },
  bamboo: {
    label: 'Mây tre đan',
    tabs: [
      { key: 'do-gia-dung', label: 'Đồ gia dụng' },
      { key: 'trang-tri', label: 'Đồ trang trí' },
    ],
    bannerImages: [
      '/images/products/Bamboo1.jpg',
      '/images/products/Bamboo2.jpg',
      '/images/products/Bamboo3.jpg',
    ],
  },
};
