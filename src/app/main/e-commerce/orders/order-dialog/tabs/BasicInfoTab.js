import TextField from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const [checked, setChecked] = useState(control._defaultValues.enabled);


  return (
    <div>

      <Controller
        name="enabled"
        control={control}
        render={({ field }) => (
          <Stack direction="row" spacing={1} alignItems="center">
            <Checkbox
              {...field}
              {...{ inputProps: { 'aria-label': 'Enabled' } }}
              onChange={(e) => field.onChange(e.target.checked)}
              checked={field.value} />
            <Typography>Enabled</Typography>
          </Stack>
        )}
      />

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            className="mt-8 mb-16"
            id="description"
            label="Description"
            type="text"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        )}
      />

    </div>
  );
}

export default BasicInfoTab;
