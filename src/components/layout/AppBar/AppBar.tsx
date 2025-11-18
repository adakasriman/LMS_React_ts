import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '@components/layout/AppBar/AppBar.module.scss';
import { Breadcrumb } from '@components/Breadcrumb';
import AppLoader from '@components/AppLoader';

const TopNav: React.FC = () => {
  return (
    <>
      <Box className={styles.topNav}>
        <Box className={styles.leftSection}>
          <Box className="mt-4">
            <Typography variant="h3" className={styles.pageTitle}>
              <Breadcrumb />
            </Typography>
          </Box>
        </Box>

        {/* Right Section */}
        <Box className={styles.rightSection}></Box>
      </Box>
      <AppLoader />
    </>
  );
};

export default TopNav;
