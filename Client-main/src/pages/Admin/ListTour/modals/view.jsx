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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tour/${rowID}`)
      .then((response) => {
        const tours = Object.values(response.data.tour);
        setTourData(tours);
        console.log(tours);
        console.log(id);
      })
      .catch((error) => console.log(error));
  }, []);

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
                        {tourItem?.duration} Days {tourItem?.duration -1} Night 
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
                    Detail tour
                  </Typography>
                  <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                  <Card>
                  <div className="slide-container">
                  <img src={tourData[0]?.tour_img}></img>
                  </div>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4} >
                  <Card style={{width: '100%'}} >
                  <div  className="tour-info panel hidden-xs">

                    <div style={{border:'1px solid blue',borderRadius:'5px', padding: '10px', color:'white', background:'hsl(210, 100%, 50%)'}}  className="panel-heading">TOUR INFORMATION</div>

                    <div style={{padding: '10px'}} className="panel-body">
                    <p>Tour ID: <strong>{tourData[0]?._id}</strong></p>
                    <p>Max tourist: <strong>{tourData[0]?.max_tourist}</strong></p>
                    <p>Transportion: <strong>{tourData[0]?.tour_transportion[0]?.transportion_name}</strong></p>
                    <p><span>Start position: <strong>{tourData[0]?.start_position?.location_name}</strong></span> </p>
                    <p><span>End position: <strong>{tourData[0]?.end_position[0]?.location_name}</strong></span> </p>
                    <p><span>Start date: <strong>{moment(tourData[0]?.start_date).format("DD/MM/YYYY")}</strong></span> </p>
                    </div> 

                    <div style={{padding: '10px'}} className="panel-footer">
                    <a href="tel:1900 6668">
                    <i className="fa fa-phone"></i>Contact: 0976055102</a>
                    </div>

                  </div>
                  </Card>
                </Grid>
                   
                    <Grid item xs={12} sm={12} sx={{ textAlign: 'left' }}>
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
