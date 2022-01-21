import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';
import * as yup from 'yup';
import ProviderContext from '_mysource/context/provider/ProviderContext';
import Provider from '_mysource/models/Provider';
import { TextField } from '@mui/material';


/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
});

function ProviderDialog(props) {
  const defaultValues = new Provider();
  const { dialog, closeDialog, create, update } = useContext(ProviderContext);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');
  const avatar = 'assets/images/avatars/profile.jpg';

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
  function onSubmit(data) {
    if (dialog.type === 'new') {
      create(data);
    } else {
      update({ ...dialog.data, ...data });
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    //  dispatch(removeContact(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...dialog}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {dialog.type === 'new' ? 'New Provider' : 'Edit Provider'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="contact avatar" src={avatar} />
          {dialog.type === 'edit' && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {name}
            </Typography>
          )}
        </div>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  className="mb-24"
                  label="Name"
                  id="name"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20" />

            <Controller
              control={control}
              name="fiscal_code"
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  className="mb-24"
                  label="Fiscal Code"
                  id="fiscal_code"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">phone</Icon>
            </div>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  className="mb-24"
                  label="Phone"
                  id="phone"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  className="mb-24"
                  label="Email"
                  id="email"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  className="mb-24"
                  label="Notes"
                  id="notes"
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                />
              )}
            />
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
              >
                Add
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={isEmpty(dirtyFields) || !isValid}
              >
                Save
              </Button>
            </div>
            <div className="px-16">
              <Button className="m-4" variant="contained"
                onClick={closeComposeDialog}>
                Close
              </Button>
            </div>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default ProviderDialog;
