import Hidden from '@mui/material/Hidden';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';


function OrdersHeader(props) {
  const mainTheme = useSelector(selectMainTheme);

  return (
    <div className="flex flex-1 items-center justify-between p-4 sm:p-24">
      <div className="flex flex-shrink items-center sm:w-224">
        <Hidden lgUp>
          <IconButton
            onClick={(ev) => {
              props.pageLayout.current.toggleLeftSidebar();
            }}
            aria-label="open left sidebar"
            size="large"
          >
            <Icon>menu</Icon>
          </IconButton>
        </Hidden>

        <div className="flex items-center">
          <Icon
            component={motion.span}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.2 } }}
            className="text-24 md:text-32"
          >
            receipt
          </Icon>
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
          >
            Orders
          </Typography>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-8 sm:px-12">
        <ThemeProvider theme={mainTheme} />
      </div>
    </div>
  );
}

export default OrdersHeader;
