import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useContext } from 'react';
import EnhancedTable from '_mysource/shared-components/enhaced-table/EnhacedTable';
import Format from '_mysource/Format';
import { useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import OrderContext from '../../../../_mysource/context/order/OrderContext';
import find from 'lodash/find';
import clsx from 'clsx';

const orderStatuses = [
  {
    name: 'Open', color: 'bg-green-800 text-white'
  }
];

function OrdersList(props) {
  const { orders, loading, retrieve, openEditDialog } = useContext(OrderContext);
  const routeParams = useParams();

  useEffect(() => {
    const { branchid } = routeParams;
    retrieve(branchid);
  }, [routeParams]);

  const columns = useMemo(
    () => [
      {
        Header: 'Proveedor',
        accessor: 'provider.name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Sucursal Origen',
        accessor: 'branch_office.name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Total',
        accessor: 'final_amount',
        className: 'font-medium',
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {Format.getInstance().price(row.original.final_amount)}
          </div>
        )
      },
      {
        Header: 'Estado',
        accessor: 'order_status.name',
        className: 'font-medium',
        sortable: true,
        Cell: ({ row }) => {
          const element = find(orderStatuses, { name: row.original.order_status.name });
          const color = (element) ? element.color : 'bg-blue-800 text-white';
          return <div className={clsx('inline text-12 font-semibold py-4 px-12 rounded-full truncate', color)} >
            {row.original.order_status.name}
          </div>
        }
      },
      {
        Header: 'Fecha',
        accessor: 'created_date',
        className: 'font-medium',
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {Format.getInstance().datetime(row.original.created_date)}
          </div>
        )
      },
    ],
    []
  );

  if (!orders) {
    return null;
  }

  if (loading) {
    return <FuseLoading />
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no orders!
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
        data={orders}
        onRowClick={(ev, row) => {
          if (row) {
            openEditDialog(row.original);
          }
        }}
      />
    </motion.div>
  );
}

export default OrdersList;
