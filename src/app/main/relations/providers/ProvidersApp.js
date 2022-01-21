import FusePageSimple from '@fuse/core/FusePageSimple';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ProviderDialog from './ProviderDialog';
import ProvidersHeader from './ProvidersHeader';
import ProvidersList from './ProvidersList';
import ProvidersSidebarContent from './ProvidersSidebarContent';
import ProviderProvider from '_mysource/context/provider/ProviderProvider';


const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    minHeight: 72,
    height: 72,
    [theme.breakpoints.up('lg')]: {
      minHeight: 136,
      height: 136,
    },
  },
  '& .FusePageSimple-wrapper': {
    minHeight: 0,
  },
  '& .FusePageSimple-contentWrapper': {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: 24,
      height: '100%',
    },
  },
  '& .FusePageSimple-content': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  '& .FusePageSimple-sidebar': {
    width: 256,
    border: 0,
  },
}));

function ProvidersApp(props) {
  const pageLayout = useRef(null);
  const routeParams = useParams();

  /*  useDeepCompareEffect(() => {
  
    }, []); */

  return (
    <>
      <ProviderProvider>
        <Root
          header={<ProvidersHeader pageLayout={pageLayout} />}
          content={<ProvidersList />}
          leftSidebarContent={<ProvidersSidebarContent />}
          sidebarInner
          ref={pageLayout}
          innerScroll
        />
        <ProviderDialog />
      </ProviderProvider>
    </>
  );
}

//export default withReducer('contactsApp', reducer)(ProvidersApp);
export default ProvidersApp;
