import "./Header.css";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Stack } from "@mui/material";
import AppContext from "../../providers/AppContext";
import Logo from "../Logo/Logo";
import { logoutUser } from "../../services/auth.service";
import PrimaryButton2 from "../PrimaryButton2/PrimaryButton2";
import { useState } from "react";
import Join from "../../views/Join/Join";
import CustomDialog from "../CustomDialog/CustomDialog";
import Login from "../../views/Login/Login"
import Profile from "../../views/Profile/Profile";
 
const Header = () => {
  const { user, userData, setContext } = useContext(AppContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogComponent, setDialogComponent] = useState('join');
  const dialogComponents = {
    join: {component: Join, title: 'Join us'},
    login: {component: Login, title: 'Login'},
    profile: {component: Profile, title: 'User Profile'}
  };
 
  const handleClose = () => setOpenDialog(false);
 
  const handleDialog = (page) => {
    setDialogComponent(page);
    setOpenDialog(true);
  }
 
  const logout = () => {
    logoutUser().then(() => setContext({ user: null, userData: null }));
  };
 
  return (
    <Stack
      id="header"
      direction="row"
      sx={{
        gap: { sm: "122px", xs: "40px" },
        mt: { sm: "32px", xs: "20px" },
        justifyContent: "space-between",
      }}
    >
      <Stack id="header-wrapper-left" direction="row">
        <Logo />
        <NavLink to="/home" className="top-menu-link">
          Home
        </NavLink>
        <NavLink to="/yogi-practices" className="top-menu-link">
          Yogi Practices
        </NavLink>
        <NavLink to="/poses" className="top-menu-link">
          Poses & Flows
        </NavLink>
        {user ? (
          <NavLink to="/yogi-goals" className="top-menu-link">
            Yogi Goals
          </NavLink>
        ) : null}
        <NavLink to="/about-us" className="top-menu-link">
          About
        </NavLink>
      </Stack>
      <Stack id="header-wrapper-right" direction="row">
        {!user ? (
          <>
            <NavLink
              to="#"
              className="top-menu-link-2"
              onClick={() => handleDialog('join')}
            >
              Join
            </NavLink>
            <NavLink
              to="#"
              className="top-menu-link-2"
              onClick={() => handleDialog('login')}
            >
              Login
            </NavLink>
          </>
        ) : (
          <>
            <PrimaryButton2 on={logout} text="Logout" />
            <NavLink to="#" onClick={() => handleDialog('profile')} className="top-menu-link-2">
              {userData.firstName}'s Profile
            </NavLink>
          </>
        )}
      </Stack>
      <CustomDialog
        Component={dialogComponents[dialogComponent].component}
        title={dialogComponents[dialogComponent].title}
        open={openDialog}
        close={handleClose}
      />
    </Stack>
  );
};
 
export default Header;