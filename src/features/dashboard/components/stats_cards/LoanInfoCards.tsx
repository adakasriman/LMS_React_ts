import React from 'react';
import { LoanInfoCard } from '@features/dashboard/components/stats_cards/LoanInfoCard';
import { Description, AccountBalanceWallet } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LoanInfoCards: React.FC = () => {
  const navigate = useNavigate();
  const handleOpenAllLoans = () => {
    console.log('Open All Loans');
    navigate('/all-loans');
  };

  const handleOpenActiveLoans = () => {
    console.log('Open Active Loans');
    navigate('/active-loans');
  };
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem',
        width: '100%',
      }}
    >
      <LoanInfoCard
        title="ALL LOANS"
        count="25,188"
        pos="5,77,07,08,505"
        disbursed="9,80,89,70,000"
        trend={15.3}
        gradientColor="linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)"
        accentColor="#1976d2"
        icon={<Description sx={{ color: 'white', fontSize: 32 }} />}
        onClick={handleOpenAllLoans}
      />
      <LoanInfoCard
        title="ACTIVE LOANS"
        count="18,521"
        pos="5,47,89,03,557"
        disbursed="7,19,53,76,000"
        trend={8.7}
        gradientColor="linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)"
        accentColor="#00897b"
        icon={<AccountBalanceWallet sx={{ color: 'white', fontSize: 32 }} />}
        onClick={handleOpenActiveLoans}
      />
    </div>
  );
};

export default LoanInfoCards;
