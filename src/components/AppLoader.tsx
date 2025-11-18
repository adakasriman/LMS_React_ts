// src/components/TopLoader.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, LinearProgress } from '@mui/material';

const AppLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Trigger loader whenever route changes
  useEffect(() => {
    queueMicrotask(() => {
      setLoading(true);
      setProgress(0);
    });

    const timer = setInterval(() => {
      setProgress((old) => (old >= 90 ? old : old + Math.random() * 10));
    }, 200);

    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 300);
    }, 200);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 3,
          borderRadius: 1,
        }}
      />
    </Box>
  );
};

export default AppLoader;
