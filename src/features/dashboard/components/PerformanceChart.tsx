import { Box, Chip } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from '@mui/icons-material';
import { performanceData } from '@utils/dashboard/dashboard-utils';

export const PerformanceChart = () => {
  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: 1.5,
        p: 3,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #f5f5f5',
      }}
    >
      <Box className="flex items-start justify-between mb-3">
        <Box>
          <Box
            component="h3"
            sx={{
              m: 0,
              mb: 1,
              fontSize: 20,
              fontWeight: 400,
              color: '#212121',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <TrendingUp className="text-blue-600" sx={{ fontSize: 24 }} />
            Lender Performance Overview
          </Box>
          <Box component="p" sx={{ m: 0, fontSize: 14, color: '#757575' }}>
            Demand vs Collection (in thousands ₹)
          </Box>
        </Box>
        <Chip
          label="Live Data"
          sx={{
            background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
            border: '1px solid #a5d6a7',
            color: '#2e7d32',
          }}
        />
      </Box>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="lender"
            tick={{ fill: '#757575', fontSize: 12 }}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <YAxis tick={{ fill: '#757575', fontSize: 12 }} axisLine={{ stroke: '#e0e0e0' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontSize: '14px',
            }}
            cursor={{ fill: '#f5f5f5' }}
          />
          <Legend wrapperStyle={{ fontSize: '14px' }} />
          <Bar dataKey="demand" fill="#1976d2" radius={[6, 6, 0, 0]} />
          <Bar dataKey="paid" fill="#4caf50" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
