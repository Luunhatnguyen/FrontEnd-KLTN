// import React from "react";
// import { useState, useEffect, useContext } from "react";
// import classnames from "classnames";
// import { Navbar, NavItem, NavLink, Container, Nav } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import cookies from "react-cookies";
// import { Link } from "react-router-dom";
import IndexHeader from "../Layout/IndexHeader";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../App";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../App";
import cookies from "react-cookies";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LoginIcon from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import travellogo from "../assets/img/street-sign-direction-way-to-bus-station-street-sign-to-bus-station-151472383.jpg";
//trang chủ admin
export default function Admin() {
  // const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  // const [navbarCollapse, setNavbarCollapse] = useState(false);
  // const [user, dispatch] = useContext(UserContext);
  // const navigate = useNavigate();

  // const logout = (event) => {
  //   event.preventDefault();
  //   cookies.remove("access_token");
  //   cookies.remove("current_user");
  //   dispatch({ type: "logout" });
  //   navigate("/");
  // };
  // let path = (
  //   <>
  //     <Link className="nav-link text-success" to="/loginCarrier">
  //       Login
  //     </Link>
  //     <Link className="nav-link text-success" to="/register">
  //       Register
  //     </Link>
  //   </>
  // );
  // if (user !== null && user != undefined) {
  //   if (user.isCarrier == true) {
  //     path = (
  //       <>
  //         <div className="user-img">
  //           <Link className="img-user text-success" to="/carrier">
  //             <img className="avt" src={user.avatar_path} alt="avatar" />
  //             user admin
  //           </Link>
  //         </div>
  //         <Link className="nav-link text-success" to="#" onClick={logout}>
  //           Logout
  //         </Link>
  //       </>
  //     );
  //   } else {
  //     console.info("Ban ko phai admin");
  //   }
  // } else {
  //   console.info("Ban ko dung ten dn");
  // }

  const nav = useNavigate();
  const [isPopUp, setPopup] = useState("true");
  const [user, dispatch] = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    cookies.remove("access_token");
    cookies.remove("current_user");
    dispatch({ type: "logout" });
    nav("/carrier");
  };

  /* Account Menu */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Menu Header
  let menuHeader = (
    <>
      <li className="dropdown">
        <NavLink activeClassName="is-current" to="/carrier" exact={true}>
          Trang Nhà Xe
        </NavLink>
      </li>
      <li className="dropdown">
        <NavLink activeClassName="is-current" to="/manageCarrier">
          Quản Lý Nhà Xe
        </NavLink>
      </li>
      {/* <li className="dropdown">
        <NavLink activeClassName="is-current" to="/addTrip">
          Thêm tuyến phục vụ mới
        </NavLink>
      </li> */}
      <li className="dropdown">
        <NavLink activeClassName="is-current" to="/addBus">
          Thêm xe
        </NavLink>
      </li>
    </>
  );

  let btMenuAccount = (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Tài Khoản">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 56, height: 56 }}>
              <i className="far fa-user" />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );

  let menuAccount = (
    <MenuItem>
      <ListItemIcon>
        <LoginIcon fontSize="small" />
      </ListItemIcon>
      <NavLink
        activeClassName="is-current"
        to="/register"
        style={{ color: "black" }}
      >
        Đăng Ký
      </NavLink>
    </MenuItem>
  );
  let mobileMenuAccount = (
    <>
      <li className="dropdown">
        <NavLink activeClassName="is-current" to="/register">
          Đăng Ký
        </NavLink>
      </li>
    </>
  );

  let infoAccount = (
    <MenuItem>
      <Avatar /> Tài Khoản
    </MenuItem>
  );
  // When user is logged
  if (user !== null && user !== undefined) {
    menuAccount = (
      <MenuItem onClick={logout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    );

    mobileMenuAccount = (
      <>
        <li className="dropdown">
          <Link to="/">{user.username}</Link>
        </li>
        <li className="dropdown">
          <Link to="/carrier" onClick={logout}>
            Đăng xuất
          </Link>
        </li>
      </>
    );

    infoAccount = (
      <MenuItem>
        <Avatar
          alt="Avatar"
          src={user.avatar_path}
          sx={{ width: 32, height: 32 }}
        />
        {user.username}
      </MenuItem>
    );
  }
  /* End Account Menu */

  // Add and Remove class mobile-menu from <body></body>
  useEffect(() => {
    document.body.classList.toggle("mobile-menu-visible", isOpen);
  }, [isOpen]);

  let replaceRightPart = ( //phan nay la default right part header
    <>
      {/* <NavLink
        to="/"
        className="login-right-header hover"
        onClick={() => {
          setOpenModalSignIn(true);
        }}
      >
        Log in
      </NavLink>
      <NavLink
        to="/"
        className="signout-right-header hover"
        onClick={() => {
          setOpenModalSignOn(true);
        }}
      >
        Sign on
      </NavLink> */}
    </>
  );

  const ToggleClass = () => {
    setPopup(!isPopUp);
  };

  if (user !== null && user != undefined) {
    replaceRightPart = (
      <>
        <div href="#" className="login-right-header">
          {user.username}
        </div>
        <div className="signout-right-header">
          <div className="user-Header-avatarContainer" onClick={ToggleClass}>
            <img
              src={user.avatar_path}
              alt="avatar-user"
              className="user-Header-avatar"
            />
          </div>
          <div
            className={
              isPopUp ? "user-popup-header" : "user-popup-header showPopup"
            }
          >
            <a href="#" className="user-popup-header--logout" onClick={logout}>
              Đăng Xuất
            </a>
          </div>
        </div>
      </>
    );
  } else {
    // console.info("Bạn đăng nhập thành công");
  }

  return (
    <>
      <header className="main-header style-three">
        <div className="header-lower">
          <div className="outer-box clearfix">
            <div className="menu-area pull-left clearfix">
              <div className="logo-box">
                <figure className="logo">
                  <Link to="/">
                    <img src={travellogo} alt="ImageLogo" />
                  </Link>
                </figure>
              </div>
              <div
                className="mobile-nav-toggler"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <i className="icon-bar" />
                <i className="icon-bar" />
                <i className="icon-bar" />
              </div>

              <nav className="main-menu navbar-expand-md navbar-light">
                <div
                  className="collapse navbar-collapse show clearfix"
                  id="navbarSupportedContent"
                >
                  <ul className="navigation clearfix">{menuHeader}</ul>
                </div>
              </nav>
            </div>

            <ul className="menu-right-content pull-right clearfix">
              <li className="search-box-outer">{btMenuAccount}</li>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 26,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                disableScrollLock={true}
              >
                {infoAccount}
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <LoginIcon fontSize="small" />
                  </ListItemIcon>
                  <NavLink
                    activeClassName="is-current"
                    to="/loginCarrier"
                    style={{
                      color: "black",
                    }}
                  >
                    Đăng Nhập
                  </NavLink>
                </MenuItem>
                {menuAccount}

                <MenuItem>
                  <ListItemIcon>
                    <ChangeCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <NavLink
                    activeClassName="is-current"
                    to="/change-password"
                    style={{ color: "black" }}
                  >
                    Đổi mật khẩu
                  </NavLink>
                </MenuItem>
              </Menu>
            </ul>
          </div>
        </div>
      </header>
      <IndexHeader />
    </>
  );
}
