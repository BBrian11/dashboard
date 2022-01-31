import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useContext, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import * as yup from 'yup';
import Product from '_mysource/models/Product';
import ProductContext from '_mysource/context/product/ProductContext';
import { useForm, FormProvider } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import BasicInfoTab from './tabs/BasicInfoTab';
import PricingTab from './tabs/PricingTab';
import ProductImagesTab from './tabs/ProductImagesTab';
import BranchOfficeTab from './tabs/BranchOfficeTab';
import ProviderTab from './tabs/ProviderTab';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Config from './../../../../../_mysource/config/Config';
import { useTranslation } from 'react-i18next';


const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
}));


/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
});

function ProductDialog(props) {
  const [tabValue, setTabValue] = useState(0);
  const { dialog, closeDialog, create, update } = useContext(ProductContext);
  const defaultValues = new Product();
  const methods = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { watch, reset, handleSubmit, formState, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const name = watch('name');
  const image_list = watch('image_list');
  const url = (image_list.length > 0) ? Config.getInstance().getApiBasePath() + '/' + image_list[0].url : null;
  const { t } = useTranslation('ecommercepage');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (dialog.type === 'edit' && dialog.data) {
      reset({ ...dialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (dialog.type === 'new') {
      reset({
        ...defaultValues,
        ...dialog.data,
        //        id: FuseUtils.generateGUID(),
      });
    }
  }, [dialog.data, dialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (dialog.open) {
      setTabValue(0);
      initDialog();
    }
  }, [dialog.open, initDialog]);


  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return closeDialog();
  }

  /**
   * Form Submit
   */
  function onSubmit() {
    const data = getValues();

    if (dialog.type === 'new') {
      create(data);
    } else {
      update({ ...dialog.data, ...data });
    }
    closeComposeDialog();
  }


  function handleTabChange(event, value) {
    setTabValue(value);
  }

  const renderClose = () => {
    return <div className="px-16">
      <Button className="m-4" variant="contained"
        onClick={closeComposeDialog}>
        {t('CLOSE')}
      </Button>
    </div>
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...dialog}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs">
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {dialog.type === 'new' ? t('DIALOGNEW') : t('DIALOGEDIT')}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar variant="square" className="w-96 h-96" alt="contact avatar" src={url} />
          {dialog.type === 'edit' && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {name}
            </Typography>
          )}
        </div>
      </AppBar>

      <FormProvider {...methods} >

        <DialogContent classes={{ root: 'p-24' }}>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-64' }}>
            <Tab className="h-64" label={t('TABBASICINFO')} />
            <Tab className="h-64" label={t('TABPRICING')} />
            <Tab className="h-64" label={t('TABBRANCH')} />
            <Tab className="h-64" label={t('TABPROVIDER')} />
            <Tab className="h-64" label={t('TABIMAGE')} />
          </Tabs>

          <div className="p-16 sm:p-24 max-w-2xl">
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <BasicInfoTab />
            </div>

            <div className={tabValue !== 1 ? 'hidden' : ''}>
              <PricingTab />
            </div>

            <div className={tabValue !== 2 ? 'hidden' : ''}>
              <BranchOfficeTab />
            </div>

            <div className={tabValue !== 3 ? 'hidden' : ''}>
              <ProviderTab />
            </div>

            <div className={tabValue !== 4 ? 'hidden' : ''}>
              <ProductImagesTab />
            </div>
          </div>

        </DialogContent>

        {dialog.type === 'new' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={isEmpty(dirtyFields) || !isValid}
                onClick={onSubmit}
              >
                {t('ADD')}
              </Button>
            </div>
            {renderClose()}
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={isEmpty(dirtyFields) || !isValid}
                onClick={onSubmit}
              >
                {t('SAVE')}
              </Button>
            </div>
            {renderClose()}
          </DialogActions>
        )}
      </FormProvider>
    </Dialog >
  );
}

export default ProductDialog;
