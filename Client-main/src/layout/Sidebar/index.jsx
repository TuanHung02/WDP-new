import React, { useState, useRef, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import GridViewIcon from '@mui/icons-material/GridView';
import BallotIcon from '@mui/icons-material/Ballot';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import TourList from '../../pages/Admin/ListTour/ListTour.jsx';
import UserList from '../../layout/Sidebar/UserManageAdmin/UserTable.jsx'
import MonitorChart from '../../pages/Admin/ChartMonitor/MonitorChart.jsx';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Chart from './chart.jsx';
import BarChartComponent from './barChart.jsx';
import TableAvatarUSer from './tableAvatarUSer.jsx';
import { useNavigate } from 'react-router-dom';
import { SiYourtraveldottv } from 'react-icons/si';
import './sidebar.scss';
import avatar from '../../images/avatar.jpg';
import { Link } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', link: '/dashboard' },
  { text: 'User Manage', link: '/admin/user-manage' },
  // { text: 'Booking Manage', link: '/admin/booking-manage' },
  { text: 'Tour Manage', link: '/admin/tour-manage' },
];

const menuSetting = [
  { text: 'Profile', link: '/admin/profile' },
  { text: 'Logout', link: '/login' }
]

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

function handleLogout() {
  localStorage.removeItem('token');
  window.location.href = '/';
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Index = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const customIcons = [SettingsIcon, LogoutIcon];

  const dashboardIcons = [
    GridViewIcon,
    PeopleAltIcon,
    BallotIcon,
    TravelExploreIcon,
    AssessmentIcon,
  ];

  return (
    <div className="body">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar className="bg-white text-slate-500">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <span className="font-bold">Admin Manage</span>
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2' }}>
              <div
                className="relative flex items-center w-80 h-9 rounded-lg focus-within:shadow-lg bg-white overflow-hidden"
                style={{
                  border: '1px solid lightgrey',
                  boxShadow: '0px 1px 1px 1px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <SearchIcon />
                </div>
                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                  type="text"
                  id="search"
                  placeholder="Search something.."
                />
              </div>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit" style={{ fontSize: 'small' }}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  <img src={avatar} alt="avatar" />
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader className="relative">
            <div className="flex justify-center items-center gap-3">
              <SiYourtraveldottv className="text-orange-400 text-2xl" />
              <span className="font-bold text-lg">TripGo</span>
            </div>
            <div style={{ position: 'absolute', right: '0.8rem' }}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
          </DrawerHeader>
          <Divider />
          <List style={{ marginBottom: '10rem', marginTop: '1rem' }}>
            {menuItems.map((item, index) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => navigate(`${item.link}`)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  component={Link}
                  to={item.link}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {React.createElement(dashboardIcons[index])}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {menuSetting?.map((item, index) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }} onClick={() => navigate(`${item.link}`)}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    onClick={handleLogout}
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {React.createElement(customIcons[index])}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <div
            className="bg-white h-full"
            style={{ borderRadius: '10px', height: 'auto' }}
          >
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <p className="text-base font-semibold text-slate-300 pb-6">
                Pages / <span className="text-slate-600">Dashboard</span>
              </p>
              <span className="text-2xl font-bold">Dashboard</span>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  <div
                    className="col-span-1 sm:col-span-1 lg:col-span-1 mb-4"
                    style={{
                      borderRadius: '10px',
                      boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className="card hover:cursor-pointer hover:bg-slate-100">
                      <div className="card-body p-3">
                        <div className="flex">
                          <div className="w-8/12">
                            <div className="numbers">
                              <p className="text-base mb-0 uppercase font-bold text-slate-400">
                                Total &nbsp;user
                              </p>
                              <h5 className="font-bold">300</h5>
                              <p className="mb-0 mt-4 text-sm">
                                <CheckCircleIcon className="text-green-600 text-xs font-bold" />
                                &nbsp;
                                <span className="text-green-600 text-xs font-bold">
                                  From Average Yesterday
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="w-4/12 flex justify-end">
                            <div className="icon bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md text-center rounded-full w-12 h-12 flex items-center justify-center">
                              <PeopleAltIcon className="text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-span-1 sm:col-span-1 lg:col-span-1 mb-4"
                    style={{
                      borderRadius: '10px',
                      boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className="card hover:cursor-pointer hover:bg-slate-100">
                      <div className="card-body p-3">
                        <div className="flex">
                          <div className="w-8/12">
                            <div className="numbers">
                              <p className="text-base mb-0 uppercase font-bold text-slate-400">
                                Total &nbsp; tour
                              </p>
                              <h5 className="font-bold">2,500</h5>
                              <p className="mb-0 mt-4 text-sm">
                                <CheckCircleIcon className="text-green-600 text-xs font-bold" />
                                &nbsp;
                                <span className="text-green-600 text-xs font-bold">
                                  From Average Yesterday
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="w-4/12 flex justify-end">
                            <div className="icon bg-gradient-to-br from-red-500 to-pink-500 shadow-md text-center rounded-full w-12 h-12 flex items-center justify-center">
                              <BookmarksIcon className="text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-span-1 sm:col-span-1 lg:col-span-1 mb-4"
                    style={{
                      borderRadius: '10px',
                      boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className="card hover:cursor-pointer hover:bg-slate-100">
                      <div className="card-body p-3">
                        <div className="flex">
                          <div className="w-8/12">
                            <div className="numbers">
                              <p className="text-base mb-0 uppercase font-bold text-slate-400">
                                Total &nbsp; price
                              </p>
                              <h5 className="font-bold">4,300</h5>
                              <p className="mb-0 mt-4 text-sm">
                                <CheckCircleIcon className="text-green-600 text-xs font-bold" />
                                &nbsp;
                                <span className="text-green-600 text-xs font-bold">
                                  From Average Yesterday
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="w-4/12 flex justify-end">
                            <div className="icon bg-gradient-to-br from-green-500 to-blue-500 shadow-md text-center rounded-full w-12 h-12 flex items-center justify-center">
                              <MonetizationOnIcon className="text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-around">
                  {/* <MonitorChart /> */}
                  <Chart />
                  <TableAvatarUSer />
                  <BarChartComponent />
                </div>

                <div className="flex justify-between mb-10">
                  <TourList />
                </div>

                <section className="text-neutral-700 dark:text-neutral-300">
                  <div className="mx-auto text-center md:max-w-xl lg:max-w-3xl">
                    <h3 className="mb-6 text-3xl font-bold">Latest Review by Customers</h3>
                    <p className="mb-6 pb-2 md:mb-12 md:pb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                  </div>

                  <div className="grid gap-6 text-center md:grid-cols-3">
                    <div>
                      <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                        <div className="h-28 overflow-hidden rounded-t-lg bg-[#9d789b]"></div>
                        <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                          <img src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" />
                        </div>
                        <div className="p-6">
                          <h4 className="mb-4 text-2xl font-semibold">
                            Maria Smantha
                          </h4>
                          <hr />
                          <p className="mt-4">
                            <span className="inline-block pe-2 [&>svg]:w-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 448 512"
                              >
                                <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                              </svg>
                            </span>
                            Lorem ipsum dolor sit amet eos adipisci, consectetur
                            adipisicing elit.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                        <div className="h-28 overflow-hidden rounded-t-lg bg-[#7a81a8]"></div>
                        <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                          <img src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp" />
                        </div>
                        <div className="p-6">
                          <h4 className="mb-4 text-2xl font-semibold">
                            Lisa Cudrow
                          </h4>
                          <hr />
                          <p className="mt-4">
                            <span className="inline-block pe-2 [&>svg]:w-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 448 512"
                              >
                                <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                              </svg>
                            </span>
                            Neque cupiditate assumenda in maiores repudi
                            mollitia architecto.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                        <div className="h-28 overflow-hidden rounded-t-lg bg-[#6d5b98]"></div>
                        <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                          <img src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" />
                        </div>
                        <div className="p-6">
                          <h4 className="mb-4 text-2xl font-semibold">
                            John Smith
                          </h4>
                          <hr />
                          <p className="mt-4">
                            <span className="inline-block pe-2 [&>svg]:w-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 448 512"
                              >
                                <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                              </svg>
                            </span>
                            Delectus impedit saepe officiis ab aliquam repellat
                            rem unde ducimus.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

              </Box>
            </Box>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Index;
