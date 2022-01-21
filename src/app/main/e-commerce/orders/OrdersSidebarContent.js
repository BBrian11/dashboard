import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import useBranches from '../../../../_mysource/hooks/useBranches';
import List from '@mui/material/List';
import Icon from '@mui/material/Icon';


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

function OrdersSidebarContent(props) {
  const { branches } = useBranches();


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

        <div className="px-12">
          <List>
            <StyledListItem
              button
              component={NavLinkAdapter}
              to="/e-commerce/orders/all"
              activeClassName="active"
            >
              <Icon className="list-item-icon text-16" color="action">
                people
              </Icon>
              <ListItemText className="truncate" primary="All orders" disableTypography />
            </StyledListItem>
          </List>

          <List>
            <ListSubheader className="pl-12" disableSticky>
              SUCURSAL
            </ListSubheader>

            {branches.length > 0 &&
              branches.map((c) => (
                <StyledListItem
                  button
                  component={NavLinkAdapter}
                  to={`/e-commerce/orders/branch/${c.id}`}
                  activeClassName="active"
                  key={c.id}
                >
                  <Icon className="list-item-icon" color="action">
                    place
                  </Icon>
                  <ListItemText primary={c.name} disableTypography />
                </StyledListItem>
              ))}
          </List>
        </div>

      </Paper>
    </div >
  );
}

export default OrdersSidebarContent;
