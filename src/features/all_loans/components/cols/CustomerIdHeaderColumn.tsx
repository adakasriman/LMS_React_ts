import React from 'react';
import { Box, Input } from '@mui/material';

const ContainerHeaderNumber: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Input placeholder="Customer Id" />
    </Box>
  );
};

export default ContainerHeaderNumber;
