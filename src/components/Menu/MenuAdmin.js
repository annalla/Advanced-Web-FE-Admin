import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles} from "@mui/styles";
import { Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ClassIcon from '@mui/icons-material/Class';
import { useLocation, useNavigate } from "react-router-dom";
import {PATH} from '../../constants/path';

const theme = createTheme({
  palette: {
      primary: {
          main: '#d2d2d2',
      },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Lucida Sans"',
      '"Lucida Sans Regular"',
      '"Lucida Grande"',
      '"Lucida Sans Unicode"',
      'sans-serif',
      'Geneva',
      'Verdana'
    ].join(','),
  },
});
const useStyles = makeStyles({
    
      paper:{
        background: 'linear-gradient(-45deg, #f0f2f0,#000c40)',   
      }
    
});

export function MenuAdmin({isAdmin,isUser,isClass}) {
  const navigate=useNavigate();
  const location=useLocation();
  const [path,setPath]=React.useState(location.pathname);
  const classes = useStyles();
  React.useEffect(()=>{
    navigate(path);
  },[path,navigate])
  return (
    <ThemeProvider theme={theme}>
    <Drawer
    classes={{ paper: classes.paper }}
      sx={{
        width: "17%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "17%",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar >
        <Typography variant="h6" fontSize="1.5rem" color="primary.main">Classroom</Typography>
      </Toolbar>
      <Divider />
      <List>
          <ListItem button key="admin" selected={isAdmin} onClick={()=>setPath(PATH.ADMIN_MANAGE)}>
            <ListItemIcon>
              <AdminPanelSettingsIcon color="primary"/>
            </ListItemIcon>
            <ListItemText >
            <Typography color="primary.main" fontWeight="550">Admin Accounts</Typography>
              </ListItemText>
          </ListItem>
          <ListItem button key="account" selected={isUser} onClick={()=>setPath(PATH.USER_MANAGE)}>
            <ListItemIcon>
              <PersonIcon color="primary"/>
            </ListItemIcon>
            <ListItemText >
              <Typography color="primary.main" fontWeight="550">User Accounts</Typography>
            </ListItemText>

          </ListItem>
          <ListItem button key="class" selected={isClass} onClick={()=>setPath(PATH.CLASS_MANAGE)}>
            <ListItemIcon>
              <ClassIcon color="primary"/>
            </ListItemIcon>
            <ListItemText>
            <Typography color="primary.main" fontWeight="550">Classes</Typography>
            </ListItemText>
          </ListItem>
      
      </List>
    </Drawer>
    </ThemeProvider>
  );
}
