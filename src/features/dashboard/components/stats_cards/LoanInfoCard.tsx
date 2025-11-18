import React from 'react';
import { Box, Chip } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

interface LoanInfoCardProps {
  title: string;
  count: string;
  pos: string;
  disbursed: string;
  trend?: number;
  gradientColor: string;
  accentColor: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function LoanInfoCard({
  title,
  count,
  pos,
  disbursed,
  trend = 12.5,
  gradientColor,
  accentColor,
  icon,
  onClick,
}: LoanInfoCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        bgcolor: 'white',
        borderRadius: 1.5,
        p: 4,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        border: '1px solid #f5f5f5',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          transform: onClick ? 'translateY(-4px)' : 'none',
        },
      }}
    >
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: gradientColor,
          opacity: 0.05,
        }}
      />

      {/* Decorative Circle */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 160,
          height: 160,
          background: gradientColor,
          borderRadius: '50%',
          mr: -10,
          mt: -10,
          opacity: 0.1,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <Box
                sx={{
                  width: 4,
                  height: 24,
                  bgcolor: accentColor,
                  borderRadius: 0.5,
                }}
              />
              <Box
                sx={{
                  fontSize: 12,
                  color: '#757575',
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                }}
              >
                {title}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <Box sx={{ fontSize: 48, color: '#212121', fontWeight: 300, lineHeight: 1 }}>
                {count}
              </Box>
              <Chip
                icon={<TrendingUp sx={{ fontSize: 16 }} />}
                label={`+${trend}%`}
                sx={{
                  bgcolor: accentColor,
                  color: 'white',
                  '& .MuiChip-icon': { color: 'white' },
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
              />
            </Box>
          </Box>

          {icon && (
            <Box
              sx={{
                p: 2,
                background: gradientColor,
                opacity: 0.9,
                borderRadius: 1.5,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        {/* Details */}
        <Box sx={{ pt: 3, borderTop: '1px solid #f5f5f5' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 14, color: '#616161' }}
            >
              <Box sx={{ width: 8, height: 8, bgcolor: accentColor, borderRadius: '50%' }} />
              <span>Principal Outstanding (POS)</span>
            </Box>
            <Box sx={{ fontSize: 20, color: '#212121' }}>₹ {pos}</Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 14, color: '#616161' }}
            >
              <Box sx={{ width: 8, height: 8, bgcolor: accentColor, borderRadius: '50%' }} />
              <span>Total Disbursed Amount</span>
            </Box>
            <Box sx={{ fontSize: 20, color: '#212121' }}>₹ {disbursed}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
