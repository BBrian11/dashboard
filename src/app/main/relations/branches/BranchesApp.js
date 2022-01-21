import FusePageSimple from '@fuse/core/FusePageSimple';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import BranchDialog from './BranchDialog';
import BranchProvider from '_mysource/context/branch/BranchProvider';
import BranchesHeader from './BranchesHeader';
import BranchesList from './BranchesList';
import BranchesSidebarContent from './BranchesSidebarContent';


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

function BranchesApp(props) {
  const pageLayout = useRef(null);
  const routeParams = useParams();

  /*  useDeepCompareEffect(() => {
  
    }, []); */

  return (
    <>
      <BranchProvider>
        <Root
          header={<BranchesHeader pageLayout={pageLayout} />}
          content={<BranchesList />}
          leftSidebarContent={<BranchesSidebarContent />}
          sidebarInner
          ref={pageLayout}
          innerScroll
        />
        <BranchDialog />
      </BranchProvider>
    </>
  );
}

//export default withReducer('contactsApp', reducer)(ProvidersApp);
export default BranchesApp;
