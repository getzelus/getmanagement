import * as React from 'react';
import { styled, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import CssBaseline from '@material-ui/core/CssBaseline';

import { useHistory} from "react-router-dom";

import Menu from './Menu';
import Routes from './Routes'

const drawerWidth = 200;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Below = styled('div')(({ theme }) => ({
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  }));




export default function Layout() {
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

//  console.log(history.action);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    //let currentWidth = getComputedStyle(drawerRef.current);
    //console.log(currentWidth);
     setOpen(false);
  };

  const handleClickAway = () => {
    if (open)  setOpen(false);
 };

 const goBack = () => {
   history.goBack();
 }

  return (
    <Box>
      
           <CssBaseline />
 
      <AppBar position="fixed" open={open}>
        <Toolbar>
         
        <ClickAwayListener onClickAway={handleClickAway}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          </ClickAwayListener>
          
          
            <IconButton 
              color="inherit" aria-label="open drawer" edge="start" onClick={goBack}
              sx={{ display: history.action !== 'POP' && !open ? 'inline' : 'none', marginRight: 1, marginTop: 1}}
            >
              <ArrowBackIcon />
            </IconButton>

          <Typography variant="h6" noWrap sx={{fontFamily: 'Wallpoet', display: open ? 'none' : 'inline'}}>
            Get Management
          </Typography>
         
        </Toolbar>
      </AppBar>
     
      <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
             
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <Menu/>
     
      </Drawer>

      <Below/>

      <Box sx={{marginTop: 4}} >
          <Routes />
      </Box>

    </Box>
  );
}
