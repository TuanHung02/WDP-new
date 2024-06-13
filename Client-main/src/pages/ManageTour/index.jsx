import React, { useState, useEffect } from 'react';
import { Navbar, NavbarLogin, Footer } from '@/layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Aos from 'aos';
import {
  Card,
  CardHeader,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Button,
  Paper,
  Box,
  Tab,
} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import NavbarPartnerLogin from '../../layout/NavbarPartnerLogin/index.jsx';
import { STATE_ADMIN_TOUR } from '../utils/components/StateAdmin.jsx';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logPartner, setLogPartner] = useState(false);
  const [user, setUser] = useState({});
  const [tours, setTours] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [tabValue, setTabValue] = useState('1');
  const currentDate = new Date().toISOString();
  const navigate = useNavigate();
  const [searchTour, setSearchTour] = useState([]);
  const [status, setStatus] = useState(true)

  useEffect(() => {
    Aos.init({ duration: 2000 });
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token));
  }, []);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token));
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;
      axios
        .get(`http://localhost:8080/api/user/${userId}`)
        .then((response) => {
          const userData = response.data.data;
          setUser(userData);
          const rid = decodedToken.role;
          if (rid === 'PARTNER') {
            setLogPartner(true);
          } else {
            setLogPartner(false);
          }
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  }, []);

  const headCells = [
    { id: 'id', label: 'ID Number', filterable: true },
    { id: 'Name', label: 'Name', filterable: false },
    { id: 'description', label: 'Description', filterable: false },
    { id: 'Price', label: 'Price', filterable: false },
    { id: 'Discount', label: ' Discount', filterable: false },
    { id: 'Max Tourist', label: 'Max Tourist', filterable: false },
    { id: 'Start Date', label: 'Start Date', filterable: false },
    { id: 'Start Positon', label: 'Start Positon', filterable: false },
    { id: 'End Positon', label: 'End Positon', filterable: false },
    {
      id: 'review-status',
      label: 'Review Status',
      filterable: false,
      align: 'center',
    },
    {
      id: 'action-button',
      label: 'Action Button',
      align: 'center',
      filterable: false,
    },
  ];

  // Get tour data
  const tourList = () => {
    axios
      .get('http://localhost:8080/api/tour/find-all')
      .then((response) => {
        const toursData = response.data.tours;
        setTours(toursData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    tourList();
  }, []);

  // Get list schedule
  const scheduleList = () => {
    axios
      .get('http://localhost:8080/api/schedule/all')
      .then((response) => {
        const scheduleData = response.data.data;
        setSchedule(scheduleData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    scheduleList();
  }, []);

  const isTourSchedule = (tourId) => {
    const scheduleCheck = schedule.find((tour) => {
      return tour.tour_id === tourId;
    });
    return scheduleCheck ? true : false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8080/api/tour/search?page=1&pageSize=10&query=${searchTour}`);
      const searchedTour = response.data.tours;
      setSearchTour(searchedTour);
      setStatus(false)
      console.log(searchedTour);
      toast.success('Wait a few seconds ~')
    } catch (error) {
      const errorData = error.response.data.error;
      console.log(errorData);
      setStatus(true)
      toast.error(errorData)
    }
  };

  useEffect(() => {
    console.log(searchTour);
  }, [searchTour]);

  return (
    <>
      {isLoggedIn ? (
        logPartner ? (
          <NavbarPartnerLogin />
        ) : (
          <NavbarLogin />
        )
      ) : (
        <Navbar />
      )}

      <div>
        <section className="w-full bg-boat bg-cover bg-bottom bg-no-repeat h-[50vh] flex justify-center bg-color2 bg-blend-multiply bg-opacity-50">
          <div className="w-full container flex justify-center items-center flex-col">
            <p className="text-white font-secondary text-3xl 2xl:text-6xl">
              Manage Tour
            </p>
          </div>
        </section>

        <div className="mt-16">
          <div data-aos="fade-up" data-aos-duration="2500" className="secIntro">
            <h2 className="secTitle font-bold text-xl">
              Innovate Captivating Tours
            </h2>
            <p>
              Create captivating and exciting tours, enabling customers to have
              the best experiences possible.
            </p>
          </div>
        </div>

        <Grid container style={{ marginBottom: '5rem' }}>
          <Grid item xs={12} sx={{ p: 6 }}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginBottom: '1rem' }}
                    size="large"
                    onClick={() => navigate('/create-tour')}
                  >
                    Create Tour
                  </Button>
                </div>
              </Grid>
              <Grid item xs={3} style={{ textAlign: 'right' }}>
                <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
                  <form className="max-w-sm" onSubmit={handleSubmit}>
                    <label
                      for="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        style={{
                          borderRadius: "70px"
                        }}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search tour name..."
                        required
                        onChange={(e) => { setSearchTour(e.target.value) }}
                      />
                      <button
                        style={{
                          borderRadius: "70px"
                        }}
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </Grid>
            </Grid>
            <Card>
              <CardHeader
                className="bg-slate-200 text-slate-400 font-bold"
                title="List Tour"
                titleTypographyProps={{ variant: 'h6', color: 'primary' }}
              />
              {status ? (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TabContext value={tabValue}>
                    <TabList
                      onChange={(event, newValue) => {
                        setTabValue(newValue);
                      }}
                      aria-label="card navigation example"
                    >
                      <Tab value="1" label="Approved tour" />
                      <Tab value="2" label="Pending tour" />
                      <Tab value="3" label="rejected tour" />
                      <Tab value="4" label="Overdue tour" />
                    </TabList>
                    <TabPanel value="1" sx={{ p: 0 }}>
                      <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {headCells.map((headCell) => (
                                <TableCell
                                  key={headCell.id}
                                  align={headCell.align ?? 'left'}
                                  style={{ fontWeight: 'bold' }}
                                >
                                  {headCell.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {tours.map((tour, index) => {
                              if (
                                tour.isAppove === 'APPROVE' &&
                                tour.start_date > currentDate
                              ) {
                                return (
                                  <TableRow hover tabIndex={-1} key={tour?._id}>
                                    <TableCell align={'left'}>
                                      {index + 1}
                                    </TableCell>
                                    <TableCell>{tour?.tour_name}</TableCell>
                                    <TableCell>
                                      {tour?.tour_description}
                                    </TableCell>
                                    <TableCell>{tour?.tour_price}$</TableCell>
                                    <TableCell>
                                      {tour?.discount}
                                    </TableCell>
                                    <TableCell>{tour?.max_tourist}</TableCell>
                                    <TableCell>
                                      {moment(tour?.start_date).format(
                                        'DD/MM/YYYY'
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {tour?.start_position?.location_name}
                                    </TableCell>
                                    {tour.end_position &&
                                      tour.end_position.length !== 0 ? (
                                      <TableCell>
                                        {tour?.end_position[0]?.location_name}
                                      </TableCell>
                                    ) : (
                                      <TableCell>
                                        {tour?.end_position?.location_name}
                                      </TableCell>
                                    )}
                                    <TableCell>
                                      {STATE_ADMIN_TOUR.find(
                                        (state) => state.value === tour.isAppove
                                      )?.label || 'UNKNOWN'}
                                    </TableCell>

                                    <TableCell align={'center'}>
                                      {isTourSchedule(tour?._id) ? (
                                        <Box
                                          display="flex"
                                          justifyContent="center"
                                        >
                                          <Tooltip title="View Detail">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-detail-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <VisibilityIcon />
                                            </Button>
                                          </Tooltip>
                                          &nbsp;
                                          <Tooltip title="Edit Tour">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-edit-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <EditIcon />
                                            </Button>
                                          </Tooltip>
                                        </Box>
                                      ) : (
                                        <Tooltip title="Create Schedule now ">
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                              minWidth: '32px',
                                              marginRight: '4px',
                                            }}
                                            onClick={() =>
                                              navigate(
                                                `/create-schedule/${tour?._id}`
                                              )
                                            }
                                          >
                                            <CalendarMonthIcon />
                                          </Button>
                                        </Tooltip>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                    <TabPanel value="2" sx={{ p: 0 }}>
                      <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {headCells.map((headCell) => (
                                <TableCell
                                  key={headCell.id}
                                  align={headCell.align ?? 'left'}
                                  style={{ fontWeight: 'bold' }}
                                >
                                  {headCell.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {tours.map((tour, index) => {
                              if (
                                tour.isAppove === 'NOTAPPROVE' &&
                                tour.start_date > currentDate
                              ) {
                                return (
                                  <TableRow hover tabIndex={-1} key={tour?._id}>
                                    <TableCell align={'left'}>
                                      {index + 1}
                                    </TableCell>
                                    <TableCell>{tour?.tour_name}</TableCell>
                                    <TableCell>
                                      {tour?.tour_description}
                                    </TableCell>
                                    <TableCell>{tour?.tour_price}$</TableCell>
                                    <TableCell>
                                      {tour?.discount}
                                    </TableCell>
                                    <TableCell>{tour?.max_tourist}</TableCell>
                                    <TableCell>
                                      {moment(tour?.start_date).format(
                                        'DD/MM/YYYY'
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {tour?.start_position?.location_name}
                                    </TableCell>
                                    {tour.end_position &&
                                      tour.end_position.length !== 0 ? (
                                      <TableCell>
                                        {tour?.end_position[0]?.location_name}
                                      </TableCell>
                                    ) : (
                                      <TableCell>
                                        {tour?.end_position?.location_name}
                                      </TableCell>
                                    )}
                                    <TableCell>
                                      {STATE_ADMIN_TOUR.find(
                                        (state) => state.value === tour.isAppove
                                      )?.label || 'UNKNOWN'}
                                    </TableCell>

                                    <TableCell align={'center'}>
                                      {isTourSchedule(tour?._id) ? (
                                        <Box
                                          display="flex"
                                          justifyContent="center"
                                        >
                                          <Tooltip title="View Detail">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-detail-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <VisibilityIcon />
                                            </Button>
                                          </Tooltip>
                                          &nbsp;
                                          <Tooltip title="Edit Tour">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-edit-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <EditIcon />
                                            </Button>
                                          </Tooltip>
                                        </Box>
                                      ) : (
                                        <Tooltip title="Create Schedule now ">
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                              minWidth: '32px',
                                              marginRight: '4px',
                                            }}
                                            onClick={() =>
                                              navigate(
                                                `/create-schedule/${tour?._id}`
                                              )
                                            }
                                          >
                                            <CalendarMonthIcon />
                                          </Button>
                                        </Tooltip>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                    <TabPanel value="3" sx={{ p: 0 }}>
                      <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {headCells.map((headCell) => (
                                <TableCell
                                  key={headCell.id}
                                  align={headCell.align ?? 'left'}
                                  style={{ fontWeight: 'bold' }}
                                >
                                  {headCell.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {tours.map((tour, index) => {
                              if (
                                tour.isAppove === 'DECLINE' &&
                                tour.start_date > currentDate
                              ) {
                                return (
                                  <TableRow hover tabIndex={-1} key={tour?._id}>
                                    <TableCell align={'left'}>
                                      {index + 1}
                                    </TableCell>
                                    <TableCell>{tour?.tour_name}</TableCell>
                                    <TableCell>
                                      {tour?.tour_description}
                                    </TableCell>
                                    <TableCell>{tour?.tour_price}$</TableCell>
                                    <TableCell>{tour?.discount}</TableCell>
                                    <TableCell>{tour?.max_tourist}</TableCell>
                                    <TableCell>
                                      {moment(tour?.start_date).format(
                                        'DD/MM/YYYY'
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {tour?.start_position?.location_name}
                                    </TableCell>
                                    {tour.end_position &&
                                      tour.end_position.length !== 0 ? (
                                      <TableCell>
                                        {tour?.end_position[0]?.location_name}
                                      </TableCell>
                                    ) : (
                                      <TableCell>
                                        {tour?.end_position?.location_name}
                                      </TableCell>
                                    )}
                                    <TableCell>
                                      {STATE_ADMIN_TOUR.find(
                                        (state) => state.value === tour.isAppove
                                      )?.label || 'UNKNOWN'}
                                    </TableCell>

                                    <TableCell align={'center'}>
                                      {isTourSchedule(tour?._id) ? (
                                        <Box
                                          display="flex"
                                          justifyContent="center"
                                        >
                                          <Tooltip title="View Detail">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-detail-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <VisibilityIcon />
                                            </Button>
                                          </Tooltip>
                                          &nbsp;
                                          <Tooltip title="Edit Tour">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-edit-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <EditIcon />
                                            </Button>
                                          </Tooltip>
                                        </Box>
                                      ) : (
                                        <Tooltip title="Create Schedule now ">
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                              minWidth: '32px',
                                              marginRight: '4px',
                                            }}
                                            onClick={() =>
                                              navigate(
                                                `/create-schedule/${tour?._id}`
                                              )
                                            }
                                          >
                                            <CalendarMonthIcon />
                                          </Button>
                                        </Tooltip>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                    <TabPanel value="4" sx={{ p: 0 }}>
                      <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {headCells.map((headCell) => (
                                <TableCell
                                  key={headCell.id}
                                  align={headCell.align ?? 'left'}
                                  style={{ fontWeight: 'bold' }}
                                >
                                  {headCell.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {tours.map((tour, index) => {
                              if (tour.start_date < currentDate) {
                                return (
                                  <TableRow hover tabIndex={-1} key={tour?._id}>
                                    <TableCell align={'left'}>
                                      {index + 1}
                                    </TableCell>
                                    <TableCell>{tour?.tour_name}</TableCell>
                                    <TableCell>
                                      {tour?.tour_description}
                                    </TableCell>
                                    <TableCell>{tour?.tour_price}$</TableCell>
                                    <TableCell>
                                      {tour?.discount}
                                    </TableCell>
                                    <TableCell>{tour?.max_tourist}</TableCell>
                                    <TableCell>
                                      {moment(tour?.start_date).format(
                                        'DD/MM/YYYY'
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {tour?.start_position?.location_name}
                                    </TableCell>
                                    {tour.end_position &&
                                      tour.end_position.length !== 0 ? (
                                      <TableCell>
                                        {tour?.end_position[0]?.location_name}
                                      </TableCell>
                                    ) : (
                                      <TableCell>
                                        {tour?.end_position?.location_name}
                                      </TableCell>
                                    )}
                                    <TableCell>
                                      {STATE_ADMIN_TOUR.find(
                                        (state) => state.value === tour.isAppove
                                      )?.label || 'UNKNOWN'}
                                    </TableCell>

                                    <TableCell align={'center'}>
                                      {isTourSchedule(tour?._id) ? (
                                        <Box
                                          display="flex"
                                          justifyContent="center"
                                        >
                                          <Tooltip title="View Detail">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-detail-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <VisibilityIcon />
                                            </Button>
                                          </Tooltip>
                                          &nbsp;
                                          <Tooltip title="Edit Tour">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-edit-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <EditIcon />
                                            </Button>
                                          </Tooltip>
                                        </Box>
                                      ) : (
                                        <Tooltip title="Create Schedule now ">
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                              minWidth: '32px',
                                              marginRight: '4px',
                                            }}
                                            onClick={() =>
                                              navigate(
                                                `/create-schedule/${tour?._id}`
                                              )
                                            }
                                          >
                                            <CalendarMonthIcon />
                                          </Button>
                                        </Tooltip>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                  </TabContext>
                </Paper>
              ) : (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TabContext value={tabValue}>
                    <TabList
                      onChange={(event, newValue) => {
                        setTabValue(newValue);
                      }}
                      aria-label="card navigation example"
                    >
                      <Tab value="1" label="Approved tour" />
                      <Tab value="2" label="Pending tour" />
                      <Tab value="3" label="rejected tour" />
                      <Tab value="4" label="Overdue tour" />
                    </TabList>
                    <TabPanel value="1" sx={{ p: 0 }}>
                      <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {headCells.map((headCell) => (
                                <TableCell
                                  key={headCell.id}
                                  align={headCell.align ?? 'left'}
                                  style={{ fontWeight: 'bold' }}
                                >
                                  {headCell.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Array.isArray(searchTour) && searchTour.map((tour, index) => {
                              if (
                                tour.isAppove === 'APPROVE' &&
                                tour.start_date > currentDate
                              ) {
                                return (
                                  <TableRow hover tabIndex={-1} key={tour?._id}>
                                    <TableCell align={'left'}>
                                      {index + 1}
                                    </TableCell>
                                    <TableCell>{tour?.tour_name}</TableCell>
                                    <TableCell>
                                      {tour?.tour_description}
                                    </TableCell>
                                    <TableCell>{tour?.tour_price}$</TableCell>
                                    <TableCell>
                                      {tour?.discount}
                                    </TableCell>
                                    <TableCell>{tour?.max_tourist}</TableCell>
                                    <TableCell>
                                      {moment(tour?.start_date).format(
                                        'DD/MM/YYYY'
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {tour?.start_position?.location_name}
                                    </TableCell>
                                    {tour.end_position &&
                                      tour.end_position.length !== 0 ? (
                                      <TableCell>
                                        {tour?.end_position[0]?.location_name}
                                      </TableCell>
                                    ) : (
                                      <TableCell>
                                        {tour?.end_position?.location_name}
                                      </TableCell>
                                    )}
                                    <TableCell>
                                      {STATE_ADMIN_TOUR.find(
                                        (state) => state.value === tour.isAppove
                                      )?.label || 'UNKNOWN'}
                                    </TableCell>

                                    <TableCell align={'center'}>
                                      {isTourSchedule(tour?._id) ? (
                                        <Box
                                          display="flex"
                                          justifyContent="center"
                                        >
                                          <Tooltip title="View Detail">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-detail-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <VisibilityIcon />
                                            </Button>
                                          </Tooltip>
                                          &nbsp;
                                          <Tooltip title="Edit Tour">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-edit-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <EditIcon />
                                            </Button>
                                          </Tooltip>
                                        </Box>
                                      ) : (
                                        <Tooltip title="Create Schedule now ">
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                              minWidth: '32px',
                                              marginRight: '4px',
                                            }}
                                            onClick={() =>
                                              navigate(
                                                `/create-schedule/${tour?._id}`
                                              )
                                            }
                                          >
                                            <CalendarMonthIcon />
                                          </Button>
                                        </Tooltip>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                    <TabPanel value="2" sx={{ p: 0 }}>
                      <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {headCells.map((headCell) => (
                                <TableCell
                                  key={headCell.id}
                                  align={headCell.align ?? 'left'}
                                  style={{ fontWeight: 'bold' }}
                                >
                                  {headCell.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Array.isArray(searchTour) && searchTour.map((tour, index) => {
                              if (
                                tour.isAppove === 'NOTAPPROVE' &&
                                tour.start_date > currentDate
                              ) {
                                return (
                                  <TableRow hover tabIndex={-1} key={tour?._id}>
                                    <TableCell align={'left'}>
                                      {index + 1}
                                    </TableCell>
                                    <TableCell>{tour?.tour_name}</TableCell>
                                    <TableCell>
                                      {tour?.tour_description}
                                    </TableCell>
                                    <TableCell>{tour?.tour_price}$</TableCell>
                                    <TableCell>
                                      {tour?.discount}
                                    </TableCell>
                                    <TableCell>{tour?.max_tourist}</TableCell>
                                    <TableCell>
                                      {moment(tour?.start_date).format(
                                        'DD/MM/YYYY'
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {tour?.start_position?.location_name}
                                    </TableCell>
                                    {tour.end_position &&
                                      tour.end_position.length !== 0 ? (
                                      <TableCell>
                                        {tour?.end_position[0]?.location_name}
                                      </TableCell>
                                    ) : (
                                      <TableCell>
                                        {tour?.end_position?.location_name}
                                      </TableCell>
                                    )}
                                    <TableCell>
                                      {STATE_ADMIN_TOUR.find(
                                        (state) => state.value === tour.isAppove
                                      )?.label || 'UNKNOWN'}
                                    </TableCell>

                                    <TableCell align={'center'}>
                                      {isTourSchedule(tour?._id) ? (
                                        <Box
                                          display="flex"
                                          justifyContent="center"
                                        >
                                          <Tooltip title="View Detail">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-detail-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <VisibilityIcon />
                                            </Button>
                                          </Tooltip>
                                          &nbsp;
                                          <Tooltip title="Edit Tour">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-edit-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <EditIcon />
                                            </Button>
                                          </Tooltip>
                                        </Box>
                                      ) : (
                                        <Tooltip title="Create Schedule now ">
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                              minWidth: '32px',
                                              marginRight: '4px',
                                            }}
                                            onClick={() =>
                                              navigate(
                                                `/create-schedule/${tour?._id}`
                                              )
                                            }
                                          >
                                            <CalendarMonthIcon />
                                          </Button>
                                        </Tooltip>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                    <TabPanel value="3" sx={{ p: 0 }}>
                      <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {headCells.map((headCell) => (
                                <TableCell
                                  key={headCell.id}
                                  align={headCell.align ?? 'left'}
                                  style={{ fontWeight: 'bold' }}
                                >
                                  {headCell.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Array.isArray(searchTour) && searchTour.map((tour, index) => {
                              if (
                                tour.isAppove === 'DECLINE' &&
                                tour.start_date > currentDate
                              ) {
                                return (
                                  <TableRow hover tabIndex={-1} key={tour?._id}>
                                    <TableCell align={'left'}>
                                      {index + 1}
                                    </TableCell>
                                    <TableCell>{tour?.tour_name}</TableCell>
                                    <TableCell>
                                      {tour?.tour_description}
                                    </TableCell>
                                    <TableCell>{tour?.tour_price}$</TableCell>
                                    <TableCell>{tour?.discount}</TableCell>
                                    <TableCell>{tour?.max_tourist}</TableCell>
                                    <TableCell>
                                      {moment(tour?.start_date).format(
                                        'DD/MM/YYYY'
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {tour?.start_position?.location_name}
                                    </TableCell>
                                    {tour.end_position &&
                                      tour.end_position.length !== 0 ? (
                                      <TableCell>
                                        {tour?.end_position[0]?.location_name}
                                      </TableCell>
                                    ) : (
                                      <TableCell>
                                        {tour?.end_position?.location_name}
                                      </TableCell>
                                    )}
                                    <TableCell>
                                      {STATE_ADMIN_TOUR.find(
                                        (state) => state.value === tour.isAppove
                                      )?.label || 'UNKNOWN'}
                                    </TableCell>

                                    <TableCell align={'center'}>
                                      {isTourSchedule(tour?._id) ? (
                                        <Box
                                          display="flex"
                                          justifyContent="center"
                                        >
                                          <Tooltip title="View Detail">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-detail-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <VisibilityIcon />
                                            </Button>
                                          </Tooltip>
                                          &nbsp;
                                          <Tooltip title="Edit Tour">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-edit-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <EditIcon />
                                            </Button>
                                          </Tooltip>
                                        </Box>
                                      ) : (
                                        <Tooltip title="Create Schedule now ">
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                              minWidth: '32px',
                                              marginRight: '4px',
                                            }}
                                            onClick={() =>
                                              navigate(
                                                `/create-schedule/${tour?._id}`
                                              )
                                            }
                                          >
                                            <CalendarMonthIcon />
                                          </Button>
                                        </Tooltip>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                    <TabPanel value="4" sx={{ p: 0 }}>
                      <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {headCells.map((headCell) => (
                                <TableCell
                                  key={headCell.id}
                                  align={headCell.align ?? 'left'}
                                  style={{ fontWeight: 'bold' }}
                                >
                                  {headCell.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Array.isArray(searchTour) && searchTour.map((tour, index) => {
                              if (tour.start_date < currentDate) {
                                return (
                                  <TableRow hover tabIndex={-1} key={tour?._id}>
                                    <TableCell align={'left'}>
                                      {index + 1}
                                    </TableCell>
                                    <TableCell>{tour?.tour_name}</TableCell>
                                    <TableCell>
                                      {tour?.tour_description}
                                    </TableCell>
                                    <TableCell>{tour?.tour_price}$</TableCell>
                                    <TableCell>
                                      {tour?.discount}
                                    </TableCell>
                                    <TableCell>{tour?.max_tourist}</TableCell>
                                    <TableCell>
                                      {moment(tour?.start_date).format(
                                        'DD/MM/YYYY'
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {tour?.start_position?.location_name}
                                    </TableCell>
                                    {tour.end_position &&
                                      tour.end_position.length !== 0 ? (
                                      <TableCell>
                                        {tour?.end_position[0]?.location_name}
                                      </TableCell>
                                    ) : (
                                      <TableCell>
                                        {tour?.end_position?.location_name}
                                      </TableCell>
                                    )}
                                    <TableCell>
                                      {STATE_ADMIN_TOUR.find(
                                        (state) => state.value === tour.isAppove
                                      )?.label || 'UNKNOWN'}
                                    </TableCell>

                                    <TableCell align={'center'}>
                                      {isTourSchedule(tour?._id) ? (
                                        <Box
                                          display="flex"
                                          justifyContent="center"
                                        >
                                          <Tooltip title="View Detail">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-detail-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <VisibilityIcon />
                                            </Button>
                                          </Tooltip>
                                          &nbsp;
                                          <Tooltip title="Edit Tour">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                minWidth: '32px',
                                                marginRight: '4px',
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  `/manage-edit-tour/${tour?._id}`
                                                )
                                              }
                                            >
                                              <EditIcon />
                                            </Button>
                                          </Tooltip>
                                        </Box>
                                      ) : (
                                        <Tooltip title="Create Schedule now ">
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                              minWidth: '32px',
                                              marginRight: '4px',
                                            }}
                                            onClick={() =>
                                              navigate(
                                                `/create-schedule/${tour?._id}`
                                              )
                                            }
                                          >
                                            <CalendarMonthIcon />
                                          </Button>
                                        </Tooltip>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                  </TabContext>
                </Paper>
              )}
            </Card>
          </Grid>
        </Grid>

        <Footer style={{ marginTop: '4rem' }} />
      </div>
    </>
  );
};

export default Index;