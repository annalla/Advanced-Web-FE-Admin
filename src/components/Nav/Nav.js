import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { indigo } from "@mui/material/colors";
import AuthContext from "../../store/context";
import { useContext } from "react";
const Nav = () => {
  const AuthCtx = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSignOut = () => {
    AuthCtx.onLogout();
  };

  return (
    <React.Fragment>
      <Container>
        <Toolbar sx={{display:"flex", flexDirection:"row-reverse"}}>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Avatar" src={AuthCtx.user.avatarUrl} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="profile" onClick={handleCloseUserMenu}>
                {/* <Typography textAlign="center">Profile</Typography> */}
                <ListItemIcon>
                  <AccountCircleIcon
                    sx={{ color: indigo[900] }}
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText sx={{ color: indigo[900] }}>
                  {AuthCtx.user.name}
                </ListItemText>
              </MenuItem>
              <MenuItem key="signOut" onClick={handleSignOut}>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: indigo[900] }} fontSize="small" />
                </ListItemIcon>
                <ListItemText sx={{ color: indigo[900] }}>
                  Sign out
                </ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Divider />
    </React.Fragment>
  );
};
export default Nav;
