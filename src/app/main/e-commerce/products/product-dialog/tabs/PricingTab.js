import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

function PricingTab(props) {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <div>
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            className="mt-8 mb-16"
            label="Price"
            id="price"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            type="number"
            variant="outlined"
            autoFocus
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default PricingTab;
