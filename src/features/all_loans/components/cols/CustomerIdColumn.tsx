import React from 'react';
import { Box, Chip } from '@mui/material';

interface ColumnProps {
  row: any;
  column?: any;
}

const ContainerNumber: React.FC<ColumnProps> = ({ row }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Chip label={row.customerId} size="small" color="primary" variant="outlined" />
    </Box>
  );
};

export default ContainerNumber;
