import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dashboard, ChevronLeft, ChevronRight, AccountCircle, Logout } from '@mui/icons-material';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import { Box, IconButton, Tooltip, Menu, MenuItem, Divider, Avatar } from '@mui/material';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@app/hooks';
import { logoutUser } from '@features/auth/authSlice';
import { Logo } from '@assets/index';
import styles from '@components/layout/SideNav/SideNav.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store';
import { useLogoutMutation } from '@api/endpoints/logoutApi';
const links = [
  { name: 'Dashboard', path: '/', icon: <Dashboard /> },
  { name: 'Components', path: '/common-components', icon: <ViewCompactIcon /> },
];

const SideNav: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user: any = useSelector((state: RootState) => state.auth.user);
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('sessionid');
    logout().unwrap();
    dispatch(logoutUser());
    handleMenuClose();
    navigate('/login');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);
  // const handleNotifOpen = (event: React.MouseEvent<HTMLElement>) =>
  //     setNotifAnchorEl(event.currentTarget);
  // const handleNotifClose = () => setNotifAnchorEl(null);

  return (
    <Box className={`${styles.sideNav} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
      <Box className={`${styles.header} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
        {!isCollapsed && (
          <Box className={styles.logoContainer}>
            <Box className={styles.logoIcon}>
              <img src={Logo} alt="Company Logo" />
            </Box>
            <Box className={styles.logoText}>LMS</Box>
          </Box>
        )}
        {isCollapsed && (
          <Box className={styles.logoIconCollapsed}>
            <img src={Logo} alt="Company Logo" />
          </Box>
        )}
      </Box>

      {/* Toggle Button */}
      <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className={styles.toggleButton}>
        {isCollapsed ? (
          <ChevronRight sx={{ fontSize: 20 }} />
        ) : (
          <ChevronLeft sx={{ fontSize: 20 }} />
        )}
      </IconButton>

      {/* Navigation Links */}
      <Box component="nav" className={styles.nav}>
        {links.map((link, index) => {
          let locationPath = location.pathname;
          if (location.pathname === '/') {
            locationPath = '/';
          }
          const isActive = locationPath === link.path;
          const isHovered = hoveredItem === link.name;

          return (
            <Tooltip key={link.name} title={isCollapsed ? link.name : ''} placement="right" arrow>
              <Link
                to={link.path}
                className={styles.navLink}
                onMouseEnter={() => setHoveredItem(link.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Box
                  className={`${styles.navItem} ${
                    isCollapsed ? styles.collapsed : styles.expanded
                  } ${isActive ? styles.active : ''} ${isHovered ? styles.hovered : ''}`}
                  sx={{
                    animation: `slideIn ${0.3 + index * 0.1}s ease-out`,
                  }}
                >
                  <Box
                    className={`${styles.navIcon} ${
                      isHovered ? styles.hovered : ''
                    } ${isActive ? styles.active : ''}`}
                  >
                    {link.icon}
                  </Box>
                  {!isCollapsed && (
                    <Box className={`${styles.navText} ${isActive ? styles.active : ''}`}>
                      {link.name}
                    </Box>
                  )}
                  {isActive && !isCollapsed && <Box className={styles.activeDot} />}
                </Box>
              </Link>
            </Tooltip>
          );
        })}
      </Box>

      {/* User Profile Section */}
      <Box className={styles.userSection}>
        <Box
          className={`${styles.userProfile} ${isCollapsed ? styles.collapsed : styles.expanded}`}
          onClick={handleMenuOpen}
        >
          <AccountCircle sx={{ fontSize: 32, color: 'white' }} />
          {!isCollapsed && (
            <Box className={styles.userInfo}>
              <Box className={styles.userName}>John Doe</Box>
              <Box className={styles.userEmail}>john.doe@example.com</Box>
            </Box>
          )}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem disabled className="flex items-center gap-2">
            <Avatar />{' '}
            <Box className="">
              {user?.user_name} ({user?.role_id})
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem disabled className="flex items-center gap-2">
            <Box className="">{user?.email_id}</Box>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleMenuClose();
              handleLogout();
            }}
          >
            <Logout fontSize="small" sx={{ mr: 1, color: 'red' }} />
            <span className="text-red-500">Logout</span>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default SideNav;
