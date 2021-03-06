import * as React from 'react';
import Box from '@mui/material/Box';
import { MenuAdmin } from '../../components/Menu/MenuAdmin';
import Nav from '../../components/Nav/Nav';
import AdminTable from '../Admin/AdminTable/AdminTable'

export default function CustomDrawer() {
  return (

    <Box sx={{ display: 'flex',width:"100%"}}>
      <MenuAdmin isAdmin={true} isClass={false} isUser={false}/>
      <Box sx={{width:"83%"}}>
        <Nav/>
        <AdminTable/>
      {/* <EnhancedTable/> */}
      </Box>
    </Box>
  );
}
