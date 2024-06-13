import React, { useState, useEffect } from 'react';
import { Navbar, NavbarLogin, Footer } from '@/layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Aos from 'aos';
import {
  Card,
  Grid,
  Button,
  Box,
  Container,
  Typography,
  CardContent,
  ImageList,
  ImageListItem,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import NavbarPartnerLogin from '../../layout/NavbarPartnerLogin/index.jsx';
import img from '../../images/image_hotel(1).jpg';
import img1 from '../../images/image_hotel(2).jpg';
import img2 from '../../images/image_hotel(3).jpg';
import img3 from '../../images/image_hotel(4).jpg';
import bgImage from '../../images/Ireland.jpg';
import maldivies from '../../images/maldives1.jpg';
import canada from '../../images/canada1.jpg';
import map from '../../images/map.jpg';
import france from '../../images/france1.jpg';

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

const DetailManageTour = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logPartner, setLogPartner] = useState(false);
  const [user, setUser] = useState({});
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

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
          console.log(decodedToken);
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

  const [allPoints, setAllPoints] = React.useState([]);
  const [points, setTours] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [tourData, setTourData] = useState([]);

  const allTourLength = allPoints.length;

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

  const { id } = useParams();

  useEffect(() => {
    const tourItems = () => {
      axios
        .get(`http://localhost:8080/api/tour/${id}`)
        .then((response) => {
          const toursData = response.data.tour.tour;
          setTourData(toursData);
          console.log('data tour:', tourData);
        })
        .catch((error) => console.log(error));
    };

    tourItems();
  }, [id]);

  useEffect(() => {
    const dataSchedule = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/schedule/${id}`
        );
        const dSchedule = response.data.schedules;
        setSchedule(dSchedule);
        console.log(dSchedule);
      } catch (error) {
        console.log(error);
      }
    };

    dataSchedule();
  }, []);

  // const schedule = [
  //   {
  //     _id: {
  //       $oid: '65f3be5815908324cf2d3aee',
  //     },
  //     schedule_name: 'Day by day',
  //     schedule_detail: 'Wonderful',
  //     schedule_date: '2024-04-10T00:00:00.000Z',
  //     tour_id: '65e0916596ae35c745213581',
  //   },
  //   {
  //     _id: '65fd161bda56b659567a5819',
  //     schedule_name: 'Vào dải ngân hà',
  //     schedule_detail:
  //       'SB NỘI BÀI – HÀ NỘI',
  //     schedule_date: '2024-04-25T00:00:00.000Z',
  //     tour_id: '65e1527d8e0780c0e38d6f69',
  //   },
  //   {
  //     _id: '65fd161bda56b659567a5819',
  //     schedule_name: 'Vào oke',
  //     schedule_detail: 'SB NỘI BÀI ',
  //     schedule_date: '2024-04-25T00:00:00.000Z',
  //     tour_id: '65e1527d8e0780c0e38d6f69',
  //   },
  //   {
  //     _id: '65fd161bda56b659567a5819',
  //     schedule_name: 'Vào day',
  //     schedule_detail: 'SB NỘI BÀI ',
  //     schedule_date: '2024-05-25T00:00:00.000Z',
  //     tour_id: '65e1527d8e0780c0e38d6f69',
  //   },
  // ];

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

        <div style={{ marginTop: '2rem ', marginBottom: '6rem' }}>
          <div className="bg-white border border-4 rounded-lg shadow relative m-10">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Detail Tour</h3>
              <div className="text-right">
                <button
                  className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  style={{
                    marginRight: '1rem',
                  }}
                  onClick={() => navigate(`/manage-edit-tour/${id}`)}
                >
                  Update tour
                </button>
                <button
                  className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => navigate('/manage-tour')}
                >
                  Return Manage Tour
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {[tourData]?.map((item) => (
                <form action="#" key={item?._id}>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="tour-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="tour-name"
                        id="tour-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        value={item?.tour_name}
                        readOnly
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="price"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Price ($)
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        value={item?.tour_price}
                        readOnly
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="discount"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Discount
                      </label>
                      <input
                        type="number"
                        name="discount"
                        id="discount"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        value={item?.discount}
                        readOnly
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="Max-Tourist"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Max Tourist
                      </label>
                      <input
                        type="number"
                        name="Max-Tourist"
                        id="Max-Tourist"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        value={item?.max_tourist}
                        readOnly
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="transportion"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Transportion
                      </label>
                      <input
                        type="text"
                        name="transportion"
                        id="transportion"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        value={
                          item?.tour_transportion &&
                          item?.tour_transportion[0]?.transportion_name
                        }
                        readOnly
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="start-date"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Start Date
                      </label>
                      <input
                        type="text"
                        name="start-date"
                        id="start-date"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        value={moment(item?.start_date).format('DD/MM/YYYY')}
                        readOnly
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="end-date"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        End Date
                      </label>
                      <input
                        type="text"
                        name="end-date"
                        id="end-date"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        value={moment(item?.end_date).format('DD/MM/YYYY')}
                        readOnly
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="start-position"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Start Position
                      </label>
                      <input
                        type="text"
                        name="start-position"
                        id="start-position"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        value={item?.start_position?.location_name}
                        readOnly
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="end-position"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        End Position
                      </label>
                      <input
                        type="text"
                        name="end-position"
                        id="end-position"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        value={
                          item?.end_position &&
                          item?.end_position[0]?.location_name
                        }
                        readOnly
                      />
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="description"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        rows="6"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                        readOnly
                      >
                        {item?.tour_description}
                      </textarea>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div
            data-aos="fade-up"
            data-aos-duration="2500"
            className="text-left ml-10"
          >
            <h2 className="secTitle font-bold text-3xl">Schedule Tour</h2>
            <p>View tour schedule details here.</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem ', marginBottom: '6rem' }}>
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
                        {tourItem.destTitle}
                      </Typography>
                      <Typography variant="body1">
                        Thời gian: {tourItem.Time}
                      </Typography>
                    </Grid>
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
                                        // justifyContent: "flex-start"
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
                                        : `Chi tiết hành trình (+${
                                            allTourLength - 2
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
                      <Box
                        sx={{
                          width: 500,
                          height: 450,
                          overflowY: 'scroll',
                          marginTop: '20px',
                        }}
                      >
                        <ImageList variant="masonry" cols={3} gap={8}>
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
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DetailManageTour;
