import { Skeleton, Grid } from '@mui/material';

interface SearchResultsLoaderProps {
  count?: number;
}

const SearchResultsLoader = ({ count = 6 }: SearchResultsLoaderProps) => {
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ borderRadius: 1, mb: 1 }}
          />
          <Skeleton width="70%" height={24} sx={{ mb: 0.5 }} />
          <Skeleton width="40%" height={24} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchResultsLoader;