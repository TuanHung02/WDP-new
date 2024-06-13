import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from '@mui/lab';
import Navbar from '../../layout/Navbar';
import NavbarLogin from '../../layout/NavbarLogin/index';
import img from '../../images/image_hotel(1).jpg';
import img1 from '../../images/image_hotel(2).jpg';
import img2 from '../../images/image_hotel(3).jpg';
import img3 from '../../images/image_hotel(4).jpg';
import bgImage from '../../images/Ireland.jpg';
import maldivies from '../../images/maldives1.jpg';
import canada from '../../images/canada1.jpg';
import map from '../../images/map.jpg';
import france from '../../images/france1.jpg';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../../layout/Footer';
import Aos from 'aos';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarPartnerLogin from '../../layout/NavbarPartnerLogin/index.jsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const tour = [
  {
    id: 1,
    imgSrc: img,
    destTitle:
      'Đông Bắc: Hà Nội - Hà Giang - Lũng Cú - Đồng Văn - Mã Pí Lèng - Mèo Vạc - Cao Bằng - Thác Bản Giốc - Hồ Ba Bể',
    locations: [
      {
        location: 'SB NỘI BÀI – HÀ NỘI',
        time: '31/01/2024',
        details:
          'Quý khách tập trung tại sân bay Tân Sơn Nhất (Ga nội địa), hướng dẫn viên hỗ trợ khách làm thủ tục đáp chuyến bay đi Hà Nội. Đến sân bay Nội Bài, xe và HDV Vietravel đón Quý khách đi Hà Nội nhận phòng khách sạn nghỉ ngơi hoặc tự do đi tham quan.',
      },
      {
        location: 'HÀ NỘI - HÀ GIANG 01 bữa ăn: (Sáng)',
        time: '01/02/2024',
        details:
          'Quý khách tập trung tại sân bay Tân Sơn Nhất (Ga nội địa), hướng dẫn viên hỗ trợ khách làm thủ tục đáp chuyến bay đi Hà Nội. Đến sân bay Nội Bài, xe và HDV Vietravel đón Quý khách đi Hà Nội nhận phòng khách sạn nghỉ ngơi hoặc tự do đi tham quan.',
      },
      {
        location: 'HÀ GIANG - QUẢN BẠ - YÊN MINH – ĐỒNG VĂN 01 bữa ăn: (Sáng)',
        time: '02/02/2024',
        details:
          'Quý khách tập trung tại sân bay Tân Sơn Nhất (Ga nội địa), hướng dẫn viên hỗ trợ khách làm thủ tục đáp chuyến bay đi Hà Nội. Đến sân bay Nội Bài, xe và HDV Vietravel đón Quý khách đi Hà Nội nhận phòng khách sạn nghỉ ngơi hoặc tự do đi tham quan.',
      },
      {
        location: 'ĐỒNG VĂN – MÈO VẠC – CAO BẰNG 01 bữa ăn: (Sáng)',
        time: '03/02/2024',
        details:
          'Quý khách tập trung tại sân bay Tân Sơn Nhất (Ga nội địa), hướng dẫn viên hỗ trợ khách làm thủ tục đáp chuyến bay đi Hà Nội. Đến sân bay Nội Bài, xe và HDV Vietravel đón Quý khách đi Hà Nội nhận phòng khách sạn nghỉ ngơi hoặc tự do đi tham quan.',
      },
      {
        location:
          'THÁC BẢN GIỐC – ĐỘNG NGƯỜM NGAO – LÀNG ĐÁ KHUỔI KY 01 bữa ăn: (Sáng)',
        time: '0/042/2024',
        details:
          'Quý khách tập trung tại sân bay Tân Sơn Nhất (Ga nội địa), hướng dẫn viên hỗ trợ khách làm thủ tục đáp chuyến bay đi Hà Nội. Đến sân bay Nội Bài, xe và HDV Vietravel đón Quý khách đi Hà Nội nhận phòng khách sạn nghỉ ngơi hoặc tự do đi tham quan.',
      },
      {
        location: 'CAO BẰNG – KHU DI TÍCH PÁC PÓ – BA BỂ 01 bữa ăn: (Sáng)',
        time: '04/02/2024',
        details:
          'Quý khách tập trung tại sân bay Tân Sơn Nhất (Ga nội địa), hướng dẫn viên hỗ trợ khách làm thủ tục đáp chuyến bay đi Hà Nội. Đến sân bay Nội Bài, xe và HDV Vietravel đón Quý khách đi Hà Nội nhận phòng khách sạn nghỉ ngơi hoặc tự do đi tham quan.',
      },
      {
        location: 'BA BỂ - BẮC CẠN – HÀ NỘI – SB NỘI BÀI 01 bữa ăn: (Sáng)',
        time: '04/02/2024',
        details:
          'Quý khách tập trung tại sân bay Tân Sơn Nhất (Ga nội địa), hướng dẫn viên hỗ trợ khách làm thủ tục đáp chuyến bay đi Hà Nội. Đến sân bay Nội Bài, xe và HDV Vietravel đón Quý khách đi Hà Nội nhận phòng khách sạn nghỉ ngơi hoặc tự do đi tham quan.',
      },
    ],
    panoramaImages: [img, img, img],
    price: '720000',
    Time: '2 ngày 1 đêm',
  },
];

const itemData = [
  {
    img: img,
    title: 'Bed',
  },
  {
    img: maldivies,
    title: 'Bed',
  },
  {
    img: map,
    title: 'Bed',
  },
  {
    img: canada,
    title: 'Bed',
  },
  {
    img: france,
    title: 'Bed',
  },
  {
    img: img1,
    title: 'Bed',
  },
  {
    img: img2,
    title: 'Bed',
  },
  {
    img: img3,
    title: 'Bed',
  },
];

const styles = {
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `url(${bgImage}) no-repeat center center fixed`,
    height: '400px',
    backgroundSize: 'cover',
    backdropFilter: 'blur(5px)',
  },
};

export default function index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const [allPoints, setAllPoints] = React.useState([]);
  const [points, setTours] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [logPartner, setLogPartner] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [tourData, setTourData] = useState([]);
  const [bookingId, setBookingId] = useState([]);
  const allTourLength = allPoints.length;
  const token = localStorage.getItem('token');
  const [schedule, setSchedule] = useState([]);
  const [calculateDate, setCaculateDate] = useState('')
  const [booked, setBooked] = useState([]);
  const [bookedPaid, setBookedPaid] = useState([]);
  const [mergedBooked, setMergedBooked] = useState();

  const handleToggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const newPoints = open
      ? allPoints
      : allPoints.filter(
        (item, index) => index === 0 || index === allTourLength - 1
      );
    setTours(newPoints);
  }, [open, allPoints, allTourLength]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token));
    axios
      .get(`http://localhost:8080/api/tour/${id}`)
      .then((response) => {
        const tours = response.data.tour.tour;
        setTourData(tours);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleBooking = (tourId) => {
    if (token) {
      setBookingId(tourId);
      toast.success('Wait few seconds ~');
      navigate(`/booking-tour/${tourId}`);
    } else {
      toast('You are not logged in ~ Please log in to book a tour !!!');
      navigate('/login');
    }
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
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

      const fetchBookedData = async () => {
        try {
          const [bookedResponse, bookedPaidResponse] = await Promise.all([
            axios.get(`http://localhost:8080/api/booking/user/${userId}?page=1&pageSize=10&status=true`),
            axios.get(`http://localhost:8080/api/booking/user/${userId}?page=1&pageSize=10&status=false`),
          ]);

          const bookedData = bookedResponse.data.tour;
          const bookedPaidData = bookedPaidResponse.data.tour;

          setBooked(bookedData);
          setBookedPaid(bookedPaidData);
          setMergedBooked(bookedData.concat(bookedPaidData));
        } catch (error) {
          console.log('Error:', error);
        }
      }

      fetchBookedData();
    }
  }, [id]);

  console.log(mergedBooked);

  useEffect(() => {
    const cDate = async () => {
      try {
        const startDate = moment(tourData?.start_date);
        const endDate = moment(tourData?.end_date);
        const timeDiff = endDate.diff(startDate, 'milliseconds');
        const totalDays = Math.ceil(moment.duration(timeDiff).asDays());
        const totalNights = totalDays - 1;
        const calDate = `${totalDays} ngày ${totalNights} đêm`;
        setCaculateDate(calDate);
      } catch (error) {
        console.log(error);
      }
    };

    cDate();
  }, [tourData]);

  useEffect(() => {
    const dataSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/schedule/${id}`)
        const dSchedule = response.data.schedules;
        setSchedule(dSchedule);
      } catch (error) {
        console.log(error);
      }
    }

    dataSchedule();
  }, [])

  const isPaid = (tourId) => {
    const bookedData = mergedBooked.find(t => {
      return t.tour_id._id === tourId && t.tour_id.isPay === true
    })
    return bookedData ? true : false
  }

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
      <Paper sx={styles.paperContainer}>
        <div style={{ padding: '2rem' }} className="flex-column">
          <Typography
            variant="h4"
            sx={{ color: 'whitesmoke', mt: 2 }}
            style={{
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          >
            {tourData.tour_name}
          </Typography>
        </div>
      </Paper>
      <Container
        style={{ padding: '2px', marginTop: '20px', marginBottom: '20px' }}
      >
        <Grid container spacing={3}>
          {tour.map((tourItem) => (
            <Grid key={tourItem.id} item xs={12} sm={12}>
              <Grid
                container
                style={{
                  padding: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8',
                }}
              >

                <Grid item xs={12} sm={6} sx={{ textAlign: 'left' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      marginBottom: '8px',
                      fontFamily: 'Arial',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#333',
                    }}
                  >
                    Schedule of tour '{tourData?.tour_name}'
                  </Typography>
                  <Typography variant="body1">
                    Thời gian: {calculateDate}
                  </Typography>
                </Grid>

                {[tourData].map((listBooked) =>
                  <Grid key={listBooked?._id} item xs={12} sm={12} sx={{ textAlign: 'right' }}>
                    {/* {isPaid(listBooked?._id) } */}
                    <Typography
                      sx={{
                        marginBottom: '8px',
                        fontFamily: 'Arial',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#fa4807',
                      }}
                    >
                      {tourData?.tour_price} $ / person
                    </Typography>
                    <Button
                      style={{
                        background:
                          'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        border: 0,
                        borderRadius: 3,
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                        color: 'white',
                        height: 48,
                        padding: '0 30px',
                      }}
                      onClick={() => handleBooking(tourData?._id)}
                    >
                      Booking now
                    </Button>
                  </Grid>
                )}
              </Grid>

              <Typography
                variant="h5"
                sx={{
                  marginBottom: '8px',
                  marginTop: '40px',
                  fontFamily: 'Arial',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  color: 'red',
                  textAlign: 'center',
                  marginLeft: '100px',
                }}
              >
                Detail Schedule
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5} sx={{ textAlign: 'left' }}>
                  <Card elevation={3}>
                    <CardContent>
                      <Timeline
                        sx={(theme) => ({
                          m: 0,
                          pl: 0,
                          pr: 0,
                          [`& .${timelineItemClasses.root}`]: {
                            minHeight: theme.spacing(6),
                            '&:before': {
                              flex: 0,
                              padding: 0,
                            },
                          },
                        })}
                      >
                        {schedule.map((schedule, index) => {
                          const isPrimaryPoint =
                            index === 0 || index === schedule.length - 1;
                          const isStart = index === 0;
                          const isEnd = index === schedule.length - 1;

                          return (
                            <React.Fragment key={schedule._id}>
                              <TimelineItem>
                                <TimelineSeparator>
                                  <TimelineDot
                                    color={
                                      index === 0
                                        ? 'success'
                                        : index === schedule.length - 1
                                          ? 'error'
                                          : 'primary'
                                    }
                                  ></TimelineDot>
                                  {!isEnd && <TimelineConnector />}
                                </TimelineSeparator>
                                <TimelineContent
                                  sx={{
                                    fontWeight: isPrimaryPoint
                                      ? 'bold'
                                      : undefined,
                                  }}
                                >
                                  <Typography variant="body1">
                                    {schedule.schedule_name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {new Date(
                                      schedule.schedule_date
                                    ).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                                  </Typography>
                                </TimelineContent>
                              </TimelineItem>
                              {isStart && allTourLength > 2 && (
                                <Button
                                  sx={{
                                    textTransform: 'none',
                                  }}
                                  onClick={handleToggle}
                                  endIcon={
                                    open ? (
                                      <ExpandLessIcon />
                                    ) : (
                                      <ExpandMoreIcon />
                                    )
                                  }
                                >
                                  {open
                                    ? 'Thu gọn'
                                    : `Chi tiết hành trình (+${allTourLength - 2
                                    } chặng)`}
                                </Button>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </Timeline>
                    </CardContent>
                  </Card>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    marginTop="10px"
                  >
                    <img
                      src={tourData?.tour_img}
                      alt="Tour photo description"
                    />
                  </Box>
                  <Box sx={{ width: 500, height: 450, overflowY: 'scroll', marginTop: '20px' }}>
                    <ImageList variant="masonry" cols={3} gap={8} >
                      {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                          <img
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={7} sx={{ textAlign: 'left' }}>
                  <Card>
                    <CardContent>
                      {schedule.map((data, index) => (
                        <div key={index}>
                          <Typography
                            component="div"
                            sx={{
                              fontFamily: 'Arial',
                              fontSize: '15px',
                              background:
                                '-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            <b>{data.schedule_name}</b>
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ marginTop: '10px', marginBottom: '15px' }}
                          >
                            {data.schedule_detail}
                          </Typography>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
