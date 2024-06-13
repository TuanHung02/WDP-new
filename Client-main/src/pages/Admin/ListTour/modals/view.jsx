import React, { useState, useEffect } from 'react';
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
  DialogTitle,
  DialogContent,
  DialogActions,
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
import { StyledDialog } from '../../../utils/components/StyledDialog';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import img from '../../../../images/image_hotel(1).jpg';
import img1 from '../../../../images/image_hotel(2).jpg';
import img2 from '../../../../images/image_hotel(3).jpg';
import img3 from '../../../../images/image_hotel(4).jpg';
import bgImage from '../../../../images/Ireland.jpg';
import maldivies from '../../../../images/maldives1.jpg';
import canada from '../../../../images/canada1.jpg';
import map from '../../../../images/map.jpg';
import france from '../../../../images/france1.jpg';

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

const View = ({ row, openModal, setOpenModal, rowID }) => {
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();
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

//   useEffect(() => {
//     const tourItems = () => {
//       axios
//         .get(`http://localhost:8080/api/tour/${id}`)
//         .then((response) => {
//           const toursData = response.data.tour.tour;
//           setTourData(toursData);
//           console.log('data tour:', tourData);
//         })
//         .catch((error) => console.log(error));
//     };

//     tourItems();
//   }, [id]);

  useEffect(() => {
    if (row && row._id) {
      const dataSchedule = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/schedule/${rowID}`
          );
          const dSchedule = response.data.schedules
          setSchedule(dSchedule);
          console.log(row._id)
          console.log('data schedule: ', dSchedule);
        } catch (error) {
          console.log(error);
        }
      };
      dataSchedule();
    }
  }, [row._id]);


  return (
    <StyledDialog open={openModal} maxWidth="md">
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography
            variant="h6"
            component="div"
            style={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            View Tour
          </Typography>
          <Button
            color="secondary"
            onClick={() => {
              setOpenModal(false);
            }}
            id="close-outline-edit"
          >
            <CloseOutlinedIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>
        <div style={{ marginTop: '2rem ', marginBottom: '6rem' }}>
          <Container
            style={{ padding: '2px', marginTop: '20px', marginBottom: '20px' }}
          >
            <Grid container spacing={3}>
              {[row]?.map((tourItem) => (
                <Grid key={tourItem?.id} item xs={12} sm={12}>
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
                        {tourItem?.tour_name}
                      </Typography>
                      <Typography variant="body1">
                        Thời gian:{' '}
                        {moment(tourItem?.start_date).format('DD/MM/YYYY')}
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
                            {schedule?.map((schedule, index) => {
                              const isPrimaryPoint =
                                index === 0 || index === schedule?.length - 1;
                              const isStart = index === 0;
                              const isEnd = index === schedule?.length - 1;

                              return (
                                <React.Fragment key={schedule?._id}>
                                  <TimelineItem>
                                    <TimelineSeparator>
                                      <TimelineDot
                                        color={
                                          index === 0
                                            ? 'success'
                                            : index === schedule?.length - 1
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
                                        {schedule?.schedule_name}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="textSecondary"
                                      >
                                        {new Date(
                                          schedule?.schedule_date
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
                            <ImageListItem key={item?.img}>
                              <img
                                srcSet={`${item?.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item?.img}?w=248&fit=crop&auto=format`}
                                alt={item?.title}
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
                          {schedule?.map((data, index) => (
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
                                {data?.schedule_detail}
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
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          onClick={() => {
            setOpenModal(false);
          }}
          id="cancel-edit"
        >
          Cancel
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default View;
