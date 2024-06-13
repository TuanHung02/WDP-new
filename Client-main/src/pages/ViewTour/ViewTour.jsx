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
import Navbar from '../../layout/Navbar';
import img from '../../images/image_hotel(1).jpg';
import img1 from '../../images/image_hotel(2).jpg';
import img2 from '../../images/image_hotel(3).jpg';
import img3 from '../../images/image_hotel(4).jpg';
import bgImage from '../../images/Ireland.jpg';
import maldivies from '../../images/maldives1.jpg'
import canada from '../../images/canada1.jpg';
import map from '../../images/map.jpg';
import france from '../../images/france1.jpg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import React from 'react';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from '@mui/lab';
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from '../../layout/Footer';

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

const ViewTour = () => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };
  const [allPoints, setAllPoints] = React.useState([]);
  const [points, setTours] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const allTourLength = allPoints.length;

  const handleToggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    setAllPoints(tour[0].locations); 
  }, []);

  React.useEffect(() => {
    const newPoints = open
      ? allPoints
      : allPoints.filter(
          (item, index) => index === 0 || index === allTourLength - 1
        );
    setTours(newPoints);
  }, [open, allPoints, allTourLength]);

  return (
    <>
      <Navbar />
      <Paper sx={styles.paperContainer}>
        <div style={{ padding: '2rem' }} className="flex-column">
          <Typography variant="h5" sx={{ color: 'whitesmoke', mt: 2 }}>
            Over 2.4 million+ stock Images by our talented community
          </Typography>
        </div>
      </Paper>
      <Container style={{ padding: '2px', marginTop: '20px', marginBottom:'20px' }}>
        <Grid container spacing={3}>
          {tour.map((tourItem) => (
            <Grid key={tourItem.id} item xs={12} sm={12}>
              <Grid
                container
                style={{
                  padding: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
                <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                  <Typography
                    sx={{
                      marginBottom: '8px',
                      fontFamily: 'Arial',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#fa4807',
                    }}
                  >
                    {formatPrice(tourItem.price)}/khách
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
                  >
                    Đăng kí ngay
                  </Button>
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
                Lịch trình
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5} sx={{ textAlign: 'left' }}>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
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
                          {points.map((point, index) => {
                            const isPrimaryPoint =
                              index === 0 || index === points.length - 1;
                            const isStart = index === 0;
                            const isEnd = index === points.length - 1;

                            return (
                              <React.Fragment key={point}>
                                <TimelineItem>
                                  <TimelineSeparator>
                                    <TimelineDot
                                      color={
                                        index === 0
                                          ? 'success'
                                          : index === points.length - 1
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
                                      {point.location}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                    >
                                      {point.time}
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
                  </Box>
                  <Box sx={{ width: 500, height: 450, overflowY: 'scroll', marginTop:'20px' }}>
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
                      {tourItem.locations.map((locationItem, index) => (
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
                            <b>{locationItem.location}</b>
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ marginTop: '10px', marginBottom: '15px' }}
                          >
                            {locationItem.details}
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
      <Footer/>
    </>
  );
};

export default ViewTour;
