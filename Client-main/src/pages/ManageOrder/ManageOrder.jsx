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
import './manageOrder.scss'; // Import the SCSS file
import { BsAlignCenter } from 'react-icons/bs';
import SearchIcon from '@mui/icons-material/Search';
const ManageOrder = () => {
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

  const [bookedTours, setBookedTours] = useState([]);
  const [searchUser, setSearchNameUser] = useState([]);

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
    { id: 'id', label: 'ID', filterable: true },
    { id: 'Name', label: 'Name', filterable: false },
    { id: 'Amount', label: 'Amount', filterable: false },
    { id: 'Number of people', label: 'Number of people', filterable: false},
    { id: 'Email', label: 'Email', filterable: false },
    { id: 'Phone', label: 'Phone', filterable: false },
    { id: 'Address', label: 'Address', filterable: false },
    { id: 'Tour ID', label: 'Tour ID', filterable: false },
    { id: 'Time booked', label: 'Time booked', filterable: false },
    {
      id: 'review-status',
      label: 'Payment Status',
      filterable: false,
      
    },
    {
      id: 'action-button',
      label: 'Action',
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
  }, []);


  
  // const [searchedUser, setSearchUser] = useState('');

  // const [allBookedTours, setAllBookedTours] = useState([]); // Thêm state này
  // const handleSearchChange = (e) => {
  //   const value = e.target.value;
  //   setSearchUser(value);
  //   if (value === '') {
  //     setBookedTours(allBookedTours); // Hiển thị lại dữ liệu ban đầu nếu không có giá trị tìm kiếm
  //   }
  // };

  // const handleSubmitSearch = (e) => {
  //   e.preventDefault();
  //   if(searchedUser){
  //     const searchedTour =  bookedTours.filter(bt => bt.user_id.username.toLowerCase().includes(searchedUser.toLowerCase()));
  //     setBookedTours(searchedTour);
  //   }else{
  //     setBookedTours(allBookedTours);
  //   }
  // };

  useEffect(() => {
    // Hàm gọi API để lấy dữ liệu
    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/booking/all');

            if (response.data.success) {
                const bookedData = response.data.getAllTourBooked;
                console.log('dataa', bookedData)
                if(searchUser == ''){
                  setBookedTours(bookedData);
                }else{
                  setBookedTours(bookedData.filter(b => b.user_id.username.toLowerCase().includes(searchUser.toLowerCase())));
                }

            } else {
                console.error('Failed to fetch bookings');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchBookings();
  }, [searchUser]);
  console.log(bookedTours)

// Function để xác nhận thanh toán
const handleConfirmPayment = async (bookingId) => {
  // Hiển thị hộp thoại xác nhận
  const confirmed = window.confirm(
    'Bạn có chắc chắn muốn xác nhận người dùng đã thanh toán không?'
  );

  if (confirmed) {
  try {
    const response = await axios.put(`http://localhost:8080/api/booking/pay/${bookingId}`);
    if (response.data.success) {
      // Cập nhật trạng thái của bookedTours sau khi nhận phản hồi từ server
      setBookedTours((prevBookedTours) =>
        prevBookedTours.map((booking) =>
          booking._id === bookingId ? { ...booking, isPay: true } : booking
        )
      );
      toast.success('Payment confirmed successfully!');
    } else {
      toast.error('Failed to confirm payment');
    }
  } catch (error) {
    console.error('Error updating payment status:', error);
    toast.error('Error confirming payment');
  }
}
};

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
      <section className="home">
      <div className="secContainer container">
        <div className="homeText">
          <h1 data-aos="fade-up" className="title font-bold text-2xl">
            Manage Booking
          </h1>
        </div>
      </div>
    </section>

        <Grid container style={{ marginBottom: '5rem' }}>
          <Grid item xs={12} sx={{ p: 6 }}>
            {/* <Grid container spacing={2}> */}
             
              <Grid item xs={12}  style={{ textAlign: 'center' }}>
                  <div
                  className="relative flex items-center w-80 h-9 rounded-lg focus-within:shadow-lg bg-white overflow-hidden"
                  style={{
                    border: '1px solid lightgrey',
                    boxShadow: '0px 1px 1px 1px rgba(0, 0, 0, 0.1)',
                    height: '60px',
                    borderRadius: '100px',
                    margin:'10px'
                  }}
                >
                  <div className="grid place-items-center h-full w-12 text-gray-300">
                    <SearchIcon />
                  </div>
                  <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Search user name.."
                    onChange={(e) => setSearchNameUser(e.target.value)}
                  />
                  </div>
              </Grid>
            {/* </Grid> */}
            
            <Card>
              <CardHeader
                className="bg-slate-200 text-slate-400 font-bold"
                title="List booking tour"
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
                      <Tab value="1" label="Paid Tour" />
                      <Tab value="2" label="Unpaid Tour" />
                      {/* <Tab value="3" label="Đơn đã hủy" /> */}
                    </TabList>
                    <TabPanel value="1" sx={{ p: 0 }}>
                      <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {headCells.filter(headCell => headCell.id !== 'action-button').map((headCell) => (
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
                            {bookedTours.map((booked, index) => {
                              if (
                                booked.isPay === true
                              ) {
                                return (
                                  <TableRow hover tabIndex={-1} key={booked?._id}>
                                    <TableCell align={'left'}>
                                      {index + 1}
                                    </TableCell>
                                    <TableCell>{booked.user_id.username}</TableCell>
                                    {/* <TableCell>
                                      {tour?.tour_description}
                                    </TableCell> */}
                                    <TableCell>{booked.amount}</TableCell>
                                    <TableCell>{booked.number_of_people}</TableCell>
                                    <TableCell>{booked.user_id.email}</TableCell>
                                    <TableCell>{booked.user_id.phoneNumber}</TableCell>
                                    <TableCell> {booked.user_id.address} </TableCell>
                                    <TableCell> {booked.tour_id._id} </TableCell>
                                    {/* <TableCell>
                                      {STATE_ADMIN_TOUR.find(
                                        (state) => state.value === tour.isAppove
                                      )?.label || 'UNKNOWN'}
                                    </TableCell> */}
                                    <TableCell> 
                                    {moment(booked.booking_date).format(
                                        'DD/MM/YYYY'
                                      )}
                                       </TableCell>
                                    <TableCell> Đã thanh toán </TableCell>
                                    {/* <TableCell align={'center'}>
                                    <button style={{backgroundColor: '#6c757d', color: '#ffffff',padding: '6px 16px',borderRadius: '4px',fontSize: '0.875rem',cursor: 'pointer',transition: 'background-color 0.3s ease',}} class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1yoxzzq-MuiButtonBase-root-MuiButton-root" tabindex="0" type="button">APPROVED<span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button>
                                    </TableCell> */}
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

                     {/* Đây là danh sách tour trong manage Tour, sửa lại về danh sách user booked nhưng chưa thanh toán ở value 1 */}
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
                            {bookedTours.map((booked, index) => {
                              if (
                                booked.isPay === false
                              ) {
                                return (
                                  <TableRow hover tabIndex={-1} key={booked?._id}>
                                    <TableCell align={'left'}>
                                      {index + 1}
                                    </TableCell>
                                    <TableCell>{booked.user_id.username}</TableCell>
                                    {/* <TableCell>
                                      {tour?.tour_description}
                                    </TableCell> */}
                                    <TableCell>{booked.amount}</TableCell>
                                    <TableCell> {booked.number_of_people}</TableCell>
                                    <TableCell>{booked.user_id.email}</TableCell>
                                    <TableCell>{booked.user_id.phoneNumber}</TableCell>
                                    <TableCell> {booked.user_id.address} </TableCell>
                                    <TableCell> {booked.tour_id._id} </TableCell>
                                    {/* <TableCell>
                                      {STATE_ADMIN_TOUR.find(
                                        (state) => state.value === tour.isAppove
                                      )?.label || 'UNKNOWN'}
                                    </TableCell> */}
                                    <TableCell> 
                                    {moment(booked.booking_date).format(
                                        'DD/MM/YYYY'
                                      )}
                                       </TableCell>
                                    <TableCell> Chưa thanh toán </TableCell>
                                    <TableCell align={'center'}>
                                    <button onClick={() => handleConfirmPayment(booked._id)} data-tooltip-target="tooltip-default" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Confirm payment
                                    </button>
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
                  aaaaa
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

export default ManageOrder;