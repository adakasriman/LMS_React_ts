import { ColumnConfig } from '@components/DataTable';

export const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57', '#a4de6c'];

export const performanceData = [
  { lender: 'DMI', demand: 1312, paid: 129 },
  { lender: 'CRF', demand: 130515, paid: 96046 },
  { lender: 'UGro-CL', demand: 3306, paid: 3196 },
  { lender: 'UGro-BC', demand: 26568, paid: 15347 },
  { lender: 'Arka', demand: 113375, paid: 81689 },
  { lender: 'Caspian', demand: 10118, paid: 5216 },
  { lender: 'WC', demand: 12574, paid: 12264 },
  { lender: 'IC', demand: 725, paid: 725 },
];

export const loanPerformanceColumns: ColumnConfig[] = [
  {
    id: 1,
    label: 'Lender',
    key: 'lender',
    style: 'max-width:160px;min-width:160px;',
  },
  {
    id: 2,
    label: 'Loan Count',
    key: 'loanCount',
    style: 'max-width:120px;min-width:120px;',
  },
  {
    id: 3,
    label: 'Demand',
    key: 'demand',
    style: 'max-width:150px;min-width:150px;',
  },
  {
    id: 4,
    label: 'Loan Paid Count',
    key: 'loanPaidCount',
    style: 'max-width:130px;min-width:130px;',
  },
  {
    id: 5,
    label: 'Paid Amount',
    key: 'paidAmount',
    style: 'max-width:150px;min-width:150px;',
  },

  {
    id: 7,
    label: 'Principal Run Down',
    key: 'principalRunDown',
    style: 'max-width:160px;min-width:160px;',
  },
];
