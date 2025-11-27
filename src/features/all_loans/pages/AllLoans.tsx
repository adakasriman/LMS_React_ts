import React, { useState } from 'react';
import DataTable from '@components/DataTable';
import { allLoansConfigColumns } from '@utils/all-loans/all-loans-list';
import usePageMeta from '@hooks/usePageMeta';
import { useGetAllLoansQuery } from '@features/all_loans/api/allLoansApi';
const AllLoans: React.FC = () => {
  usePageMeta({
    name: 'allLoans',
    title: 'All loans',
  });

  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllLoansQuery();

  // const getSelectedList = () => {
  //   console.log(selectedRows);
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      {/* <Button onClick={getSelectedList}>
            send selected ids
        </Button> */}
      <DataTable
        columns={allLoansConfigColumns}
        data={data}
        fixedHeaders={true}
        offsetHeight={134}
        checkBoxSelection={true}
        checkboxStoredKey="customerId"
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        totalPages={1}
        page={page}
        handleChangePage={handleChangePage}
        loading={isLoading}
      />
    </div>
  );
};

export default AllLoans;
