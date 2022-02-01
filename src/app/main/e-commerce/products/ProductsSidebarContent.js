import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import ProductContext from '_mysource/context/product/ProductContext';
import { useContext, useState } from 'react';
import useBranches from './../../../../_mysource/hooks/useBranches';
import useProviders from './../../../../_mysource/hooks/useProviders';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import isNil from 'lodash/isNil';
import { useTranslation } from 'react-i18next';


const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: 'inherit!important',
  textDecoration: 'none!important',
  height: 40,
  width: '100%',
  borderRadius: 6,
  paddingLeft: 12,
  paddingRight: 12,
  marginBottom: 4,
  '&.active': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, .05)!important'
        : 'rgba(255, 255, 255, .1)!important',
    pointerEvents: 'none',

    '& .list-item-icon': {
      color: 'inherit',
    },
  },
  '& .list-item-icon': {
    fontSize: 16,
    width: 16,
    height: 16,
    marginRight: 16,
  },
}));

function ProductsSidebarContent(props) {
  const [provider, setProvider] = useState({});
  const [branch, setBranch] = useState({});
  const { openNewDialog, retrieve } = useContext(ProductContext);
  const { branches } = useBranches();
  const { providers } = useProviders();
  const { t } = useTranslation('ecommercepage');

  const handleBranchChange = (ev) => {
    const id = isNil(provider) ? null : provider.id;
    setBranch(ev.target.value);
    retrieve(ev.target.value.id, id);
  }

  const handleProviderChange = (ev) => {
    const id = isNil(branch) ? null : branch.id;
    setProvider(ev.target.value);
    retrieve(id, ev.target.value.id);
  }

  const handleAll = () => {
    setProvider(null);
    setBranch(null);
    retrieve();
  }

  const renderProviderSelect = () => {
    return (
      <Box className="flex w-full px-8 py-4">
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={provider}
            onChange={handleProviderChange} >
            {providers.map(p => (
              <MenuItem key={`${p.id}${p.name}`} value={p}>{p.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    )
  }

  const renderBranchSelect = () => {
    return (
      <Box className="flex w-full px-8 py-4">
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={branch}
            onChange={handleBranchChange} >
            {branches.map(p => (
              <MenuItem key={`${p.id}${p.name}`} value={p}>{p.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    )
  }

  return (
    <div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
      <Paper
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        className="rounded-0 shadow-none lg:rounded-16 lg:shadow"
      >
        <div className="p-24 flex items-center">
          {/*   <Avatar alt={user.name} src={user.avatar} />
          <Typography className="mx-12">{user.name}</Typography> */}
        </div>

        <Divider />

        <div className="p-24">
          <Button
            variant="contained"
            color="secondary"
            className="w-full"
            onClick={(ev) => { openNewDialog() }}
          >
            {t('NEWPRODUCT')}
          </Button>
        </div>

        <div className="px-12">
          <List>
            <StyledListItem
              button
              onClick={handleAll}
              activeClassName="active">
              <Icon className="list-item-icon text-16" color="action">
                people
              </Icon>
              <ListItemText className="truncate" primary={t('ALLPRODUCTS')} disableTypography />
            </StyledListItem>
          </List>

          <List>
            <ListSubheader className="pl-12" disableSticky>
              {t('BRANCHTITLE')}
            </ListSubheader>
            {renderBranchSelect()}
          </List>

          <List>
            <ListSubheader className="pl-12" disableSticky>
              {t('PROVIDERTITLE')}
            </ListSubheader>
            {renderProviderSelect()}
          </List>
        </div>

      </Paper>
    </div >
  );
}

export default ProductsSidebarContent;
