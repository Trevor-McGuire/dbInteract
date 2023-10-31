import React, { useState, useEffect, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import LoginIcon from "@mui/icons-material/Login";
import TemporaryDrawer from "./TemporaryDrawer";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { READ_CART_QUERY } from "../../utils/queries";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const generateMenuProps = (anchorEl, opened, handleClose, id) => ({
  anchorEl,
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
  id: id,
  keepMounted: true,
  transformOrigin: {
    vertical: "top",
    horizontal: "right",
  },
  open: opened,
  onClose: handleClose,
});

export default function PrimarySearchAppBar() {
  const [state, setState] = React.useState({ left: false });
  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [numberOfItems, setNumberOfItems] = useState(0);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const searchInputRef = useRef(null);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchText ? (window.location.href = `/search/${searchText}`) : "";
    }
  };



  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const NavButton = ({ icon, label, to, onClick, badge }) => {
    const buttonProps = {
      size: "large",
      color: "inherit",
      "aria-label": label,
      sx: { gap: "16px" },
    };

    if (to) {
      buttonProps.component = Link;
      buttonProps.to = to;
    } else if (onClick) {
      buttonProps.onClick = onClick;
    }

    return (
      <IconButton {...buttonProps}>
        {badge ? (
          <Badge badgeContent={badge} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
        {label && <span>{label}</span>}
      </IconButton>
    );
  };

  const ProfileNavButton = ({ text }) => (
    <NavButton
      icon={<AccountCircle />}
      label={text ? "Profile" : ""}
      to="/profile"
    />
  );

  const LoginNavButton = ({ text }) => (
    <NavButton icon={<LoginIcon />} label={text ? "Login" : ""} to="/login" />
  );

  const LogoutNavButton = ({ text }) => (
    <NavButton
      icon={<LogoutIcon />}
      label={text ? "Logout" : ""}
      onClick={() => Auth.logout()}
    />
  );

  const RegisterNavButton = ({ text }) => (
    <NavButton
      icon={<HowToRegIcon />}
      label={text ? "Register" : ""}
      to="/register"
    />
  );

  const CartNavButton = ({ text, badge }) => {

    const { data } = useQuery(READ_CART_QUERY);
    useEffect(() => {
      if (data) {
        setNumberOfItems(data?.readUser?.cart.length);
      }
    }, [data]);

    return(
    <NavButton
      icon={<ShoppingCartIcon />}
      label={text ? "Cart" : ""}
      to="/cart"
      badge={badge}
    />)
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu {...generateMenuProps(anchorEl, isMenuOpen, handleMenuClose, menuId)}>
      <MenuItem onClick={handleMenuClose}>
        <ProfileNavButton text={true} />
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <LogoutNavButton text={true} />
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      {...generateMenuProps(
        mobileMoreAnchorEl,
        isMobileMenuOpen,
        handleMobileMenuClose,
        mobileMenuId
      )}
    >
      {Auth.loggedIn() ? (
        [
          <MenuItem key="cart" onClick={handleMenuClose}>
            <CartNavButton text={true} badge={numberOfItems} />
          </MenuItem>,
          <MenuItem key="profile" onClick={handleMenuClose}>
            <ProfileNavButton text={true} />
          </MenuItem>,
          <MenuItem key="logout" onClick={handleMenuClose}>
            <LogoutNavButton text={true} />
          </MenuItem>,
        ]
      ) : (
        [
          <MenuItem key="login" onClick={handleMenuClose}>
            <LoginNavButton text={true} />
          </MenuItem>,
          <MenuItem key="register" onClick={handleMenuClose}>
            <RegisterNavButton text={true} />
          </MenuItem>,
        ]
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)} // Open the Drawer on Menu Icon click
          >
            <MenuIcon />
          </IconButton>
          <Link to={"/"}>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              NexCommerce
            </Typography>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{
                "aria-label": "search",
                type: "text",
                placeholder: "Search...",
                value: searchText,
                onChange: (e) => handleSearchInputChange(e),
                onKeyDown: (e) => handleSearchSubmit(e),
                ref: searchInputRef,
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {Auth.loggedIn() ? (
              <>
                <CartNavButton text={false} badge={numberOfItems} />
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </>
            ) : (
              <>
                <LoginNavButton text={false} />
                <RegisterNavButton text={false} />
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>

          {/* Drawer component */}
          <TemporaryDrawer
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
