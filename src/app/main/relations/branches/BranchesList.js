import { motion } from 'framer-motion';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState, useContext } from 'react';
import EnhancedTable from '_mysource/shared-components/enhaced-table/EnhacedTable';
import BranchContext from '_mysource/context/branch/BranchContext';
import FuseLoading from '@fuse/core/FuseLoading';


function BranchesList(props) {
  const [filteredData, setFilteredData] = useState(null);
  const { branches, loading, openEditDialog } = useContext(BranchContext);

  useEffect(() => {
    setFilteredData(branches);
  }, [branches])

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'avatar',
        Cell: ({ row }) => {
          return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
        },
        className: 'justify-center',
        width: 64,
        sortable: false,
      },
      {
        Header: 'Business Name',
        accessor: 'name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'CUIL',
        accessor: 'fiscal_code',
        className: 'font-medium',
        sortable: true,
        Cell: ({ row }) => {
          return row.original.fiscal_code || '-'
        }
      },
      {
        Header: 'Email',
        accessor: 'email',
        sortable: true,
        Cell: ({ row }) => {
          return row.original.email || '-'
        }
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        sortable: true,
        Cell: ({ row }) => {
          return row.original.phone || '-'
        }
      },
    ],
    []
  );


  if (!filteredData) {
    return null;
  }

  if (loading) {
    return <FuseLoading />
  }


  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no branch offices!
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-auto w-full max-h-full"
    >
      <EnhancedTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            openEditDialog(row.original);
          }
        }}
      />
    </motion.div>
  );
}

export default BranchesList;
