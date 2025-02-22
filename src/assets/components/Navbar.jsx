import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileMenuOpen(open);
  };

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

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to="/">Home</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="/ProfileView">Profile</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="/LoginRouting">My Account</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="/FirstLogin">Log In</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="/LogoutConfirmation">Log Out</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="/">Your Orders</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="/TodoList">Add Tasks</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="/Yourtasks">Your Task</Link></MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Mobile Menu Button */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* LOGO */}
          <img
            className="h-12"
            src="/public/istockphoto-168362728-612x612.png"
            alt="LOGO"
            style={{ marginRight: '15px', height: '70px', width: '90px' , margin: '5px'}}
          />

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to="/" style={{ marginRight: 20, color: 'white', textDecoration: 'none' }}>Home</Link>
            <Link to="/ProfileView" style={{ marginRight: 20, color: 'white', textDecoration: 'none' }}>Profile</Link>
            <Link to="/Yourtasks" style={{ marginRight: 20, color: 'white', textDecoration: 'none' }}>Your Task</Link>
            <Link to="/" style={{ marginRight: 20, color: 'white', textDecoration: 'none' }}>Your Orders</Link>
            <Link to="/" style={{ marginRight: 20, color: 'white', textDecoration: 'none' }}>Contact Us</Link>
            <Link to="/FirstLogin" style={{ marginRight: 20, color: 'white', textDecoration: 'none' }}>Log In</Link>
            <Link to="/LogoutConfirmation" style={{ marginRight: 20, color: 'white', textDecoration: 'none' }}>Log Out</Link>      
        </Box>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
          </Box>

          {/* Profile & Notifications */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={2} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" edge="end" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

    

      <Drawer
  anchor="left"
  open={mobileMenuOpen}
  onClose={toggleDrawer(false)}
  sx={{
    '& .MuiDrawer-paper': {
      backgroundColor: '#0b4d8f', // Black background
      color: 'white', // Default text color
      width: 220, // Set width
    },
  }}
>
  <List>
    {[
      { text: 'Home', path: '/' },
      { text: 'Profile', path: '/ProfileView' },
      { text: 'Your Task', path: '/Yourtasks' },
      { text: 'Your Orders', path: '/' },
      { text: 'Contact Us', path: '/' },
      { text: 'Log In', path: '/FirstLogin' },
      { text: 'Log Out', path: '/LogoutConfirmation' }
    ].map(({ text, path }) => (
      <ListItem button key={text} onClick={() => setMobileMenuOpen(false)}>
        <Link
          to={path}
          style={{
            textDecoration: 'none',
            color: 'white', // Default text color
            fontWeight: 'bold', // Make text bold
            width: '100%',
            padding: '10px 20px',
            display: 'block',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'gray')} // Turn gray on hover
          onMouseLeave={(e) => (e.target.style.color = 'white')} // Revert to white
        >
          <ListItemText primary={text} />
        </Link>
      </ListItem>
    ))}
  </List>
</Drawer>



      {renderMenu}
    </Box>
  );
}
