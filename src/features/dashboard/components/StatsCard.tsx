import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

interface StatsCardProps {
  // Content
  title: string;
  value: string;
  subtitle?: string;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;

  // Colors
  accentColor?: string;
  gradientColor?: string;

  // Actions
  onClick?: () => void;

  // Customization
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'minimal' | 'detailed';
  showTrend?: boolean;
  showIcon?: boolean;

  // Additional data points
  dataPoints?: Array<{
    label: string;
    value: string;
    color?: string;
  }>;

  // Style overrides
  sx?: any;
}

export function StatsCard({
  title,
  value,
  subtitle,
  trend = 12.5,
  trendLabel = `+${trend}%`,
  icon,
  onClick,
  accentColor = '#6366f1',
  gradientColor = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  size = 'medium',
  variant = 'default',
  showTrend = true,
  showIcon = true,
  dataPoints = [],
  sx = {},
}: StatsCardProps) {
  // Size configurations
  const sizeConfig = {
    small: {
      padding: 2,
      valueFontSize: 32,
      titleFontSize: 11,
      iconSize: 40,
    },
    medium: {
      padding: 3,
      valueFontSize: 48,
      titleFontSize: 12,
      iconSize: 48,
    },
    large: {
      padding: 4,
      valueFontSize: 56,
      titleFontSize: 13,
      iconSize: 56,
    },
  };

  const config = sizeConfig[size];

  // Variant configurations
  const variantStyles = {
    default: {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      hoverShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      showDecoration: true,
      showDataPoints: true,
    },
    minimal: {
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
      hoverShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      showDecoration: false,
      showDataPoints: false,
    },
    detailed: {
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
      hoverShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
      showDecoration: true,
      showDataPoints: true,
    },
  };

  const variantConfig = variantStyles[variant];

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        bgcolor: 'white',
        borderRadius: 2,
        p: config.padding,
        boxShadow: variantConfig.boxShadow,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        border: '1px solid #f5f5f5',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          boxShadow: variantConfig.hoverShadow,
          transform: onClick ? 'translateY(-4px)' : 'none',
        },
        ...sx,
      }}
    >
      {/* Gradient Overlay */}
      {variantConfig.showDecoration && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: gradientColor,
            opacity: 0.05,
          }}
        />
      )}

      {/* Decorative Circle */}
      {variantConfig.showDecoration && (
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
      )}

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
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
              <Typography
                variant="caption"
                sx={{
                  color: '#757575',
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                  fontSize: config.titleFontSize,
                  fontWeight: 500,
                }}
              >
                {title}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, flexWrap: 'wrap' }}>
              <Typography
                sx={{
                  fontSize: config.valueFontSize,
                  color: '#212121',
                  fontWeight: 300,
                  lineHeight: 1,
                  fontFeatureSettings: '"tnum"',
                }}
              >
                {value}
              </Typography>

              {showTrend && trend && (
                <Chip
                  icon={<TrendingUp sx={{ fontSize: 16 }} />}
                  label={trendLabel}
                  size="small"
                  sx={{
                    bgcolor: accentColor,
                    color: 'white',
                    '& .MuiChip-icon': { color: 'white' },
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    fontSize: '0.75rem',
                  }}
                />
              )}
            </Box>

            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: '#616161',
                  mt: 1,
                  fontSize: '0.875rem',
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          {showIcon && icon && (
            <Box
              sx={{
                p: 1.5,
                background: gradientColor,
                opacity: 0.9,
                borderRadius: 1.5,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                width: config.iconSize,
                height: config.iconSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        {/* Data Points */}
        {variantConfig.showDataPoints && dataPoints.length > 0 && (
          <Box sx={{ pt: 2, borderTop: '1px solid #f5f5f5' }}>
            {dataPoints.map((point, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: index === dataPoints.length - 1 ? 0 : 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      bgcolor: point.color || accentColor,
                      borderRadius: '50%',
                    }}
                  />
                  <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem' }}>
                    {point.label}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    color: '#212121',
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  {point.value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Trend Section */}
        {showTrend && trend && (
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: '1px solid #f5f5f5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Month-over-Month Growth
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: accentColor,
                fontFeatureSettings: '"tnum"',
              }}
            >
              {trend}% ↑
            </Typography>
          </Box>
        )}

        {/* Click indicator */}
        {onClick && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              fontSize: 12,
              color: accentColor,
              opacity: 0.7,
            }}
          >
            Click to view details →
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Usage Examples:

/*
// Basic usage
<StatsCard
  title="Total Revenue"
  value="$12,426"
  accentColor="#10b981"
  gradientColor="linear-gradient(135deg, #10b981 0%, #059669 100%)"
/>

// With data points
<StatsCard
  title="Portfolio Summary"
  value="1,284"
  accentColor="#6366f1"
  dataPoints={[
    { label: "Portfolio Outstanding", value: "₹ 45.2L", color: "#6366f1" },
    { label: "Total Disbursed", value: "₹ 82.7L", color: "#8b5cf6" },
  ]}
/>

// Minimal variant
<StatsCard
  title="Active Users"
  value="2,847"
  variant="minimal"
  size="small"
  accentColor="#f59e0b"
/>

// With custom icon and trend
<StatsCard
  title="Conversion Rate"
  value="24.3%"
  trend={8.2}
  trendLabel="+8.2%"
  icon={<TrendingUp />}
  accentColor="#ef4444"
  gradientColor="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
/>

// Clickable card
<StatsCard
  title="Performance Metrics"
  value="A+"
  onClick={() => console.log('Card clicked')}
  accentColor="#8b5cf6"
/>
*/
