import DemoContent from '@fuse/core/DemoContent';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { getUser, removeUserSession } from '../../Utils/Common';
import React from 'react';

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

function DashboardPage(props) {
  const { t } = useTranslation('dashboardPage');
  const user = getUser();
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

 
  return (
    
    <Root
      header={
        <div className="p-24">
          <h4>{t('TITLE')}</h4>
          <h4> Welcome {user.name}!<br /></h4>
          
        </div>
        
      }
      contentToolbar={
        <div className="px-24">
          <h4>Content Toolbar</h4>
        </div>
      }
      content={
        <div className="p-24">
          <h4>Content</h4>
          <br />
          <DemoContent />
        </div>
      }
    />
  );
}

export default DashboardPage;
