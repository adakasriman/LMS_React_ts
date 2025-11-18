import { Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrackChanges } from '@mui/icons-material';

interface CollectionRateProps {
  data: any[];
  COLORS: string[];
}

export function CollectionRate({ data, COLORS }: CollectionRateProps) {
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
      <Box sx={{ mb: 3 }}>
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
          <TrackChanges sx={{ color: '#4caf50', fontSize: 24 }} />
          Collection Rate
        </Box>
        <Box component="p" sx={{ m: 0, fontSize: 14, color: '#757575' }}>
          Overall EMI Performance
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={55}
            fill="#8884d8"
            dataKey="value"
            stroke="white"
            strokeWidth={3}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontSize: '14px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
          mt: 3,
          pt: 3,
          borderTop: '1px solid #f5f5f5',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            p: 2,
            background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
            borderRadius: 1,
            border: '1px solid #a5d6a7',
          }}
        >
          <Box sx={{ fontSize: 14, color: '#616161', mb: 1 }}>Collected</Box>
          <Box sx={{ fontSize: 24, fontWeight: 400, color: '#2e7d32' }}>₹21.46Cr</Box>
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            p: 2,
            background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
            borderRadius: 1,
            border: '1px solid #ffcc80',
          }}
        >
          <Box sx={{ fontSize: 14, color: '#616161', mb: 1 }}>Pending</Box>
          <Box sx={{ fontSize: 24, fontWeight: 400, color: '#e65100' }}>₹8.38Cr</Box>
        </Box>
      </Box>
    </Box>
  );
}
