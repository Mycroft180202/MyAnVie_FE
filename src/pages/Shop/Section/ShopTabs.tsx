import { Box, Typography } from '@mui/material';

type Tab = {
  key: string;
  label: string;
};

const ShopTabs = ({
  tab,
  tabs,
  onTabChange,
}: {
  tab: string;
  tabs: Tab[];
  onTabChange: (tab: string) => void;
}) => {
  if (!tabs || tabs.length === 0) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
      {tabs.map((tabItem) => (
        <Box
          key={tabItem.key}
          sx={{
            width: `${100 / tabs.length}%`,
            textAlign: 'center',
            cursor: 'pointer',
            pb: 1,
            borderBottom: tab === tabItem.key ? '2px solid #950B0B' : '2px solid transparent',
          }}
          onClick={() => onTabChange(tabItem.key)}
        >
          <Typography
            sx={{ fontSize: 18, fontWeight: 500, color: tab === tabItem.key ? '#950B0B' : '#000' }}
          >
            {tabItem.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ShopTabs;
