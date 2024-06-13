import {
  Button,
  CardMedia,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Navbar from '../../layout/Navbar';
import NavbarLogin from '../../layout/NavbarLogin/index'
import Footer from '../../layout/Footer';
import { useState } from 'react';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode'
import Aos from 'aos';

import NavbarPartnerLogin from '../../layout/NavbarPartnerLogin/index.jsx';

const BookingTour = () => {

  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [numberPeople, setNumberPeople] = useState(1);
  const [type, setType] = useState('option1');
  const [option1Check, setOption1Checked] = useState(false);
  const [option2Check, setOption2Checked] = useState(false);
  const [textComment, setTextComment] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [tourData, setTourData] = useState([]);
  const [user, setUser] = useState({});

  const handleBirthDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      setBirthDate(event.target.value);
    }
  };

  const calculateTotalCost = (price, numberPeople) => {
    return price * numberPeople;
  };

  const handleOption1Change = () => {
    setType('option1');
    setOption1Checked(true);
    setOption2Checked(false);
  };

  const handleOption2Change = () => {
    setType('option2');
    setOption2Checked(true);
    setOption1Checked(false);
  };

  const { id } = useParams();

  const handleBooking = async (event) => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      try {
        const userId = decodedToken.user_id;
        const response = await axios.post(`http://localhost:8080/api/booking/${id}`, {
          user_id: userId
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const responseData = response.data;
          console.log('Booking tour successful:', responseData);
          toast.success('Booking successful ~')
          navigate(`/payment/${id}`)
        } else {
          console.error('Booking tour failed:', response.status);
          const errorData = response.error;
          console.error('Error Data:', errorData);
          toast.error(errorData.error);
          navigate('/list-tour');
        }
      } catch (error) {
        console.error('Booking tour failed');
        toast.error('You already booked this tour ~ Pay now to complete your tour booking !');
        navigate(`/payment/${id}`);
      }
    } else {
      toast('You are not logged in ~ Please log in to book a tour !!!')
      navigate('/login');
    }
  };

  useEffect(() => {
    localStorage.setItem('numberPeople', numberPeople);
  }, [numberPeople]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token));
    axios.get(`http://localhost:8080/api/tour/${id}`)
      .then((response) => {
        const tours = Object.values(response.data.tour);
        setTourData(tours);
      })
      .catch(error => console.log(error));
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

  const [logPartner, setLogPartner] = useState(false);

  const handleNumberPeopleChange = (event) => {
    const value = event.target.value;
    setNumberPeople(value);
  };

  useEffect(() => {
    if (user) {
      setFullName(user.username || '');
      setEmail(user.email || '');
      setTelephone(user.phoneNumber || '');
      setAddress(user.address || '');
    }
  }, [user])

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

      <section className="w-full bg-boat bg-cover bg-bottom bg-no-repeat h-[50vh] flex justify-center bg-color2 bg-blend-multiply bg-opacity-50">
        <div className="w-full container flex justify-center items-center flex-col">
          <p className="text-white font-secondary text-3xl 2xl:text-6xl" style={{ fontStyle: "italic", color: "#fff" }}>
            Wish you have an enjoyable experience !
          </p>
        </div>
      </section>
      <Container
        style={{ padding: '2px', marginTop: '10px', marginBottom: '20px' }}
      >
        <Grid container spacing={3}>
          <Grid key={tourData?._id} item xs={12} sm={12}>
            <Grid
              container
              style={{
                padding: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              <Grid item xs={12} sm={4} sx={{ textAlign: 'left' }}>
                <CardMedia
                  component="img"
                  image={tourData[0]?.tour_img}
                  alt="Live from space album cover"
                  sx={{ borderRadius: '10px 0px 0px 10px' }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                sx={{ textAlign: 'left', backgroundColor: '#f2f1ed' }}
              >
                <Typography
                  sx={{
                    marginBottom: '8px',
                    fontFamily: 'Arial',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#fa4807',
                    paddingLeft: '20px',
                  }}
                >
                  {tourData[0]?.tour_description}
                </Typography>
                <Typography
                  sx={{
                    marginBottom: '8px',
                    fontFamily: 'Arial',
                    fontSize: '15px',
                    color: '#000000',
                    paddingLeft: '20px',
                  }}
                >
                  Mã tour: <b>{tourData[0]?._id}</b>
                </Typography>
                <Typography
                  sx={{
                    marginBottom: '8px',
                    fontFamily: 'Arial',
                    fontSize: '15px',
                    color: '#000000',
                    paddingLeft: '20px',
                  }}
                >
                  Giá vé: <b>{(tourData[0]?.tour_price)}$/khách</b>
                </Typography>
                <Typography
                  sx={{
                    marginBottom: '8px',
                    fontFamily: 'Arial',
                    fontSize: '15px',
                    color: '#000000',
                    paddingLeft: '20px',
                  }}
                >
                  Khởi hành: <b>{moment(tourData[0]?.start_date).format("DD/MM/YYYY")}</b>


                </Typography>
                <Typography
                  sx={{
                    marginBottom: '8px',
                    fontFamily: 'Arial',
                    fontSize: '15px',
                    color: '#000000',
                    paddingLeft: '20px',
                  }}
                >
                  Nơi khởi hành: <b>{tourData[0]?.start_position?.location_name}</b>
                </Typography>
                <Typography
                  sx={{
                    marginBottom: '8px',
                    fontFamily: 'Arial',
                    fontSize: '15px',
                    color: '#000000',
                    paddingLeft: '20px',
                  }}
                >
                  Điểm đến: <b>{tourData[0]?.end_position[0]?.location_name}</b>
                </Typography>
                <Typography
                  sx={{
                    marginBottom: '8px',
                    fontFamily: 'Arial',
                    fontSize: '15px',
                    color: '#000000',
                    paddingLeft: '20px',
                  }}
                >
                  Số chỗ còn nhận: <b>{tourData[0]?.max_tourist}</b>
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={8} xs={12} className="left">
                <Typography
                  variant="h2"
                  sx={{
                    marginBottom: '33px',
                    marginTop: '45px',
                    fontSize: '30px',
                    fontWeight: '700',
                    color: '#2d4271',
                    lineHeight: '38px',
                    width: '100%',
                  }}
                >
                  Tổng quan chuyến đi
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    marginBottom: '33px',
                    marginTop: '45px',
                    fontSize: '20px',
                    lineHeight: '40px',
                    fontWeight: '700',
                    color: '#2d4271',
                    width: '100%',
                  }}
                >
                  Thông tin liên lạc
                </Typography>
                <Grid
                  sx={{
                    textAlign: 'left',
                    backgroundColor: '#f2f1ed',
                    borderRadius: '10px',
                  }}
                >
                  <FormGroup
                    sx={{
                      alignItems: 'center',
                      borderRadius: '10px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      padding: '1rem',
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="additionalText1"
                          label="Họ và tên"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            mt: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '20px',
                            backgroundColor: '#ffffff',
                          }}
                          value={fullName}
                          onChange={(event) => {
                            setFullName(event.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="email"
                          label="Emai"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            mt: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '20px',
                            backgroundColor: '#ffffff',
                          }}
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="sdt"
                          label="Số điện thoại"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            mt: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '20px',
                            backgroundColor: '#ffffff',
                          }}
                          value={telephone}
                          onChange={(event) => {
                            setTelephone(event.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="additionalText4"
                          label="Địa chỉ"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            mt: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '20px',
                            backgroundColor: '#ffffff',
                          }}
                          value={address}
                          onChange={(event) => {
                            setAddress(event.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>
                </Grid>

                <Typography
                  variant="h3"
                  sx={{
                    marginBottom: '33px',
                    marginTop: '45px',
                    fontSize: '25px',
                    lineHeight: '40px',
                    fontWeight: '700',
                    color: '#2d4271',
                    width: '100%',
                  }}
                >
                  Hành khách
                </Typography>
                <TextField
                  fullWidth
                  id="number-people"
                  label="Số lượng hành khách"
                  placeholder="1"
                  type="number"
                  onKeyDown={(e) =>
                    ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
                  }
                  InputProps={{
                    inputProps: {
                      min: 1,
                      max: tourData[0]?.max_tourist,
                    },
                  }}
                  value={numberPeople}
                  onChange={handleNumberPeopleChange}
                />

                <Typography
                  variant="h3"
                  sx={{
                    marginBottom: '33px',
                    marginTop: '45px',
                    fontSize: '25px',
                    lineHeight: '40px',
                    fontWeight: '700',
                    color: '#2d4271',
                    width: '100%',
                  }}
                >
                  Lựa chọn thông tin tư vấn
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={type === 'option1'}
                      onChange={handleOption1Change}
                    />
                  }
                  label="Tôi sẽ liên hệ với nhân viên khi cần tư vấn"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={type === 'option2'}
                      onChange={handleOption2Change}
                    />
                  }
                  label={
                    <span>Tôi cần được nhân viên tư vấn <strong style={{ fontStyle: "italic" }}>G6GO</strong> trợ giúp nhập thông tin đăng ký dịch vụ</span>
                  }
                />
                <Grid
                  sx={{
                    textAlign: 'left',
                    backgroundColor: '#f2f1ed',
                    borderRadius: '10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                  }}
                >
                  {type === 'option2' && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          multiline
                          id="loadbalancer-create-ip-address"
                          label="Vui lòng nhập nội dung lời nhắn bằng tiếng Anh hoặc tiếng Việt"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              alignItems: 'baseline',
                            },
                            backgroundColor: '#ffffff',
                          }}
                          customvalue={textComment}
                          customsetvalue={setTextComment}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                <Grid
                  sx={{
                    textAlign: 'left',
                    backgroundColor: '#f2f1ed',
                    borderRadius: '10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                  }}
                >
                  {type === 'option1' && (

                    <FormGroup></FormGroup>
                  )}
                </Grid>
              </Grid>
              <Grid item md={4} xs={12} className="right">
                <Grid
                  sx={{
                    textAlign: 'left',
                    backgroundColor: '#f2f1ed',
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      marginBottom: '33px',
                      marginTop: '45px',
                      fontSize: '20px',
                      lineHeight: '40px',
                      fontWeight: '700',
                      color: '#2d4271',
                      width: '100%',
                      paddingLeft: '20px',
                    }}
                  >
                    Tóm tắt chuyến đi
                  </Typography>
                  <Grid item xs={12} sm={12} sx={{ textAlign: 'left' }}>
                    <CardMedia
                      component="img"
                      image={tourData[0]?.tour_img}
                      alt="Live from space album cover"
                      sx={{
                        borderRadius: '10px 0px 0px 10px',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        marginBottom: '20px',
                      }}
                    />
                  </Grid>
                  <Typography
                    sx={{
                      marginBottom: '8px',
                      fontFamily: 'Arial',
                      fontSize: '15px',
                      color: '#000000',
                      paddingLeft: '20px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <EventIcon sx={{ marginRight: '8px' }} />
                    <span style={{ marginRight: '7px', color: '#2d4271' }}>
                      {' '}
                      Ngày bắt đầu:
                    </span>
                    <b>{moment(tourData[0]?.start_date).format("DD/MM/YYYY")}</b>
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: '8px',
                      fontFamily: 'Arial',
                      fontSize: '15px',
                      color: '#000000',
                      paddingLeft: '20px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <EventIcon sx={{ marginRight: '8px' }} />
                    <span style={{ marginRight: '7px', color: '#2d4271' }}>
                      Ngày kết thúc:
                    </span>{' '}
                    <b>{moment(tourData[0]?.end_date).format("DD/MM/YYYY")}</b>
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: '8px',
                      fontFamily: 'Arial',
                      fontSize: '15px',
                      color: '#000000',
                      paddingLeft: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      paddingTop: '10px',
                    }}
                  >
                    <span>
                      <GroupsIcon sx={{ marginRight: '8px' }} />
                      <b style={{ marginRight: '30px', color: '#2d4271' }}>
                        Hành khách:
                      </b>
                    </span>
                    <b style={{ marginLeft: 'auto', paddingRight: '20px' }}>
                      {numberPeople} x {(tourData[0]?.tour_price)}$/khách
                    </b>
                  </Typography>

                  <Typography
                    sx={{
                      marginBottom: '8px',
                      fontFamily: 'Arial',
                      fontSize: '15px',
                      color: '#000000',
                      paddingLeft: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      paddingTop: '10px',
                    }}
                  >
                    <b style={{ marginRight: '30px', color: '#2d4271' }}>
                      Chi phí{' '}
                    </b>
                    <b style={{ marginLeft: 'auto', paddingRight: '20px' }}>
                      {(
                        "$" + calculateTotalCost(tourData[0]?.tour_price, numberPeople)
                      )}
                    </b>
                  </Typography>

                  <Divider />
                  <Typography
                    sx={{
                      marginBottom: '8px',
                      fontFamily: 'Arial',
                      fontSize: '18px',
                      color: '#000000',
                      paddingLeft: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      paddingTop: '10px',
                    }}
                  >
                    <b style={{ color: '#2d4271' }}>Tổng Thanh Toán</b>
                    <b
                      style={{
                        color: 'red',
                        fontSize: '25px',
                        marginLeft: 'auto',
                        paddingRight: '20px',
                      }}
                    >
                      {(
                        "$" + calculateTotalCost(tourData[0]?.tour_price, numberPeople) + ".00"
                      )}
                    </b>
                  </Typography>
                  <Divider />
                  <Button
                    style={{
                      background:
                        'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                      border: 0,
                      borderRadius: 10,
                      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                      color: 'white',
                      height: 48,
                      marginTop: '20px',
                      marginBottom: '20px',
                      width: '100%',
                      paddingX: '20px',
                    }}
                    onClick={handleBooking}
                  >
                    Đăng kí ngay
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};
export default BookingTour;
