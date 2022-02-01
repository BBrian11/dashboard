import { motion } from 'framer-motion';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useContext } from 'react';
import EnhancedTable from '_mysource/shared-components/enhaced-table/EnhacedTable';
import ProductContext from '_mysource/context/product/ProductContext';
import Format from '_mysource/Format';
import { useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import Config from './../../../../_mysource/config/Config';
import { useTranslation } from 'react-i18next';


function ProductsList(props) {
  const { products, loading, retrieve, openEditDialog } = useContext(ProductContext);
  const routeParams = useParams();
  const { t } = useTranslation('ecommercepage');

  useEffect(() => {
    const { branchid } = routeParams;
    retrieve(branchid);
  }, [routeParams]);

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'avatar',
        Cell: ({ row }) => {
          const url = (row.original.image_list.length > 0) ? Config.getInstance().getApiBasePath() + '/' + row.original.image_list[0].url : null;
          return <Avatar variant="square" className="mx-8" alt={row.original.name} src={url} />;
        },
        className: 'justify-center',
        width: 64,
        sortable: false,
      },
      {
        Header: 'Name',
        accessor: 'name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Description',
        accessor: 'description',
        className: 'font-medium',
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {Format.getInstance().limited(row.original.description)}
          </div>
        )
      },
      {
        Header: 'Price',
        accessor: 'price',
        className: 'font-medium',
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {Format.getInstance().price(row.original.price)}
          </div>
        )
      },
      {
        Header: t('ENABLED'),
        accessor: 'enabled',
        className: 'font-medium',
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {row.original.enabled ? (
              <Icon className="text-green text-20">check_circle</Icon>
            ) : (
              <Icon className="text-red text-20">remove_circle</Icon>
            )}
          </div>
        )
      },
    ],
    []
  );

  if (!products) {
    return null;
  }

  if (loading) {
    return <FuseLoading />
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          {t('NOPRODUCTS')}
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
        data={products}
        onRowClick={(ev, row) => {
          if (row) {
            openEditDialog(row.original);
          }
        }}
      />
    </motion.div>
  );
}

export default ProductsList;
