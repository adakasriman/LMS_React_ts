import { ColumnConfig } from '@components/DataTable';
import CustomerIdColumn from '@features/all_loans/components/cols/CustomerIdColumn';
import CustomerIdHeaderColumn from '@features/all_loans/components/cols/CustomerIdHeaderColumn';

export const allLoansConfigColumns: ColumnConfig[] = [
  {
    id: 1,
    label: 'Customer Id',
    key: 'customerId',
    template: CustomerIdColumn,
    style: 'max-width:150px;min-width:150px;',
    headerTemplate: CustomerIdHeaderColumn,
  },
  {
    id: 2,
    label: 'App Id',
    key: 'appId',
    style: 'max-width:100px;min-width:100px;',
  },
  {
    id: 3,
    label: 'Organization',
    key: 'organization',
    style: 'max-width:100px;min-width:100px;',
  },
  {
    id: 4,
    label: 'LAN Number',
    key: 'lanNumber',
    style: 'max-width:190px;min-width:190px;',
  },
  {
    id: 5,
    label: 'Customer Name',
    key: 'customerName',
    header: 'Customer Name',
    style: 'max-width:140px;min-width:140px;',
  },
  {
    id: 6,
    label: 'Loan Amount',
    key: 'loanAmount',
    style: 'max-width:140px;min-width:140px;',
  },
  {
    id: 7,
    label: 'Disbursement Approval Date',
    key: 'disbursementApprovalDate',
    style: 'max-width:130px;min-width:130px;',
  },
  {
    id: 8,
    key: 'disbDate',
    label: 'Disb Date',
    style: 'max-width:90px;min-width:90px;',
  },
];
