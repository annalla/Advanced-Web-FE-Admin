import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import EnhancedTable from './PageDemo';
import { MenuAdmin } from './MenuAdmin';
import Nav from '../../components/Nav/Nav';
import DetailAccount from './DetailAccount';


export default function Detail() {
  return (

    <Box sx={{ display: 'flex',width:"100%"}}>
      <MenuAdmin isAdmin={true} isClass={false} isUser={false}/>
      <Box sx={{width:"83%"}}>
        <Nav/>
        <DetailAccount/>
      </Box>
    </Box>
  );
}
