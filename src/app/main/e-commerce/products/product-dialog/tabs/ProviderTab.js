import { Controller, useFormContext } from 'react-hook-form';
import { useContext, useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useProviders from '_mysource/hooks/useProviders';
import ProductProvider from '_mysource/models/ProductProvider';


function ProviderTab(props) {
  const [checkedValues, setCheckedValues] = useState([]);
  const { providers } = useProviders();
  const methods = useFormContext();
  const { control, getValues } = methods;

  // Initialize the checkedValues
  useEffect(() => {
    setCheckedValues(getValues().provider_list);
  }, [providers])

  const handleSelect = (pprov) => {
    const newList = checkedValues?.find(x => x.provider_id === pprov.provider_id)
      ? checkedValues?.filter(x => x.provider_id !== pprov.provider_id)
      : [...(checkedValues ?? []), pprov];
    setCheckedValues(newList);
    return newList;
  }

  return (
    <div>
      <Controller
        name="provider_list"
        control={control}
        render={({ field }) => {
          return (
            <>
              {providers.map(b => {
                const o = new ProductProvider();
                o.provider_id = b.id;
                return (
                  <Stack direction="row" spacing={1} alignItems="center" key={`${b.id}${b.name}`}>
                    <Checkbox
                      onChange={(e) => field.onChange(handleSelect(o))}
                      checked={checkedValues?.find(x => x.provider_id === b.id) ? true : false} />
                    <Typography>{b.name}</Typography>
                  </Stack>
                )
              })}
            </>
          )
        }}
      />
    </div>

  );
}

export default ProviderTab;
