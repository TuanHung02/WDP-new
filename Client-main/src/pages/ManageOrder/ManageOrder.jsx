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
    { id: 'Tên', label: 'Tên', filterable: false },
    { id: 'Chi phí', label: 'Chi phí', filterable: false },
    { id: 'Số người', label: 'Số người', filterable: false },
    { id: 'Email', label: 'Email', filterable: false },
    { id: 'Điện thoại', label: 'Điện thoại', filterable: false },
    { id: 'Địa chỉ', label: 'Địa chỉ', filterable: false },
    { id: 'Mã Tour', label: 'Mã Tour', filterable: false },
    { id: 'Thời gian đặt', label: 'Thời gian đặt', filterable: false },
    {
      id: 'review-status',
      label: 'Trạng thái thanh toán',
      filterable: false,
      
    },
    {
      id: 'action-button',
      label: 'Tác vụ',
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

  const [bookedTours, setBookedTours] = useState([]);
  useEffect(() => {
    // Hàm gọi API để lấy dữ liệu
    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/booking/all');
            if (response.data.success) {
                setBookedTours(response.data.getAllTourBooked);
            } else {
                console.error('Failed to fetch bookings');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchBookings();
  }, []);
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
        <section className="w-full bg-boat bg-cover bg-bottom bg-no-repeat h-[50vh] flex justify-center bg-color2 bg-blend-multiply bg-opacity-50">
          <div className="w-full container flex justify-center items-center flex-col">
            <p className="text-white text-3xl 2xl:text-6xl">
              Quản lý đơn đặt từ người dùng
            </p>
          </div>
        </section>

        <Grid container style={{ marginBottom: '5rem' }}>
          <Grid item xs={12} sx={{ p: 6 }}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
              </Grid>
              <Grid item xs={3} style={{ textAlign: 'right' }}>
                <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
                  <form className="max-w-sm" onSubmit={handleSubmit}>
                    <label
                      for="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Tìm kiếm
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
                        placeholder="Tìm kiếm theo tên...."
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
                        Tìm kiếm
                      </button>
                    </div>
                  </form>
                </div>
              </Grid>
            </Grid>
            <Card>
              <CardHeader
                className="bg-slate-200 text-slate-400 font-bold"
                title="Danh sách đơn đặt"
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
                      <Tab value="1" label="Đơn đã thanh toán" />
                      <Tab value="2" label="Đơn chưa thanh toán" />
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
                                    Xác nhận thanh toán
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