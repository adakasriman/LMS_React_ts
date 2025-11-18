import React from 'react';
import LoanInfoCards from '@features/dashboard/components/stats_cards/LoanInfoCards';
import { PerformanceChart } from '@features/dashboard/components/PerformanceChart';
import { CollectionRate } from '@features/dashboard/components/CollectionRate';
import { loanPerformanceColumns } from '@utils/dashboard/dashboard-utils';
import { loanPerformanceList } from '@mocks/dashboard';
import DataTable from '@components/DataTable';
import { Box } from '@mui/material';
import { useGetDashboardDataQuery } from '@api/endpoints/dashboardApi';
const Overview: React.FC = () => {
  const { data, isLoading, error } = useGetDashboardDataQuery();
  console.log(data, isLoading, error);

  const cardsData = [
    { name: 'Collected', value: 71.76 },
    { name: 'Pending', value: 28.24 },
  ];

  const COLORS = ['#4caf50', '#ff9800'];

  return (
    <div className="space-y-6">
      <LoanInfoCards />
      <div className="flex gap-6">
        <div className="w-3/5">
          <PerformanceChart />
        </div>
        <div className="w-2/5">
          <CollectionRate data={cardsData} COLORS={COLORS} />
        </div>
      </div>
      <Box
        className="space-y-6 bg-white"
        sx={{
          borderRadius: 1.5,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <DataTable
          columns={loanPerformanceColumns}
          data={loanPerformanceList}
          fixedHeaders={true}
          checkboxStoredKey="customerId"
          loading={false}
        />
      </Box>
    </div>
  );
};

export default Overview;
