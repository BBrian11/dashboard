import { Controller, useFormContext } from 'react-hook-form';
import { useContext, useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ProductBranchOffice from '_mysource/models/ProductBranchOffice';
import useBranches from '_mysource/hooks/useBranches';


function BranchOfficeTab(props) {
  const [checkedValues, setCheckedValues] = useState([]);
  const { branches } = useBranches();
  const methods = useFormContext();
  const { control, getValues } = methods;

  // Initialize the checkedValues
  useEffect(() => {
    setCheckedValues(getValues().branch_office_list);
  }, [branches])

  const handleSelect = (pbo) => {
    const newList = checkedValues?.find(x => x.branch_office_id === pbo.branch_office_id)
      ? checkedValues?.filter(x => x.branch_office_id !== pbo.branch_office_id)
      : [...(checkedValues ?? []), pbo];
    setCheckedValues(newList);
    return newList;
  }

  return (
    <div>
      <Controller
        name="branch_office_list"
        control={control}
        render={({ field }) => {
          return (
            <>
              {branches.map(b => {
                const o = new ProductBranchOffice();
                o.branch_office_id = b.id;
                return (
                  <Stack direction="row" spacing={1} alignItems="center" key={`${b.id}${b.name}`}>
                    <Checkbox
                      onChange={(e) => field.onChange(handleSelect(o))}
                      checked={checkedValues?.find(x => x.branch_office_id === b.id) ? true : false} />
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

export default BranchOfficeTab;
