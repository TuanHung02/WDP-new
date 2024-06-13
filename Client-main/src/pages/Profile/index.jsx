import React, { useState, useEffect } from 'react';
import './profile.scss';
import { Navbar, NavbarLogin } from '@/layout';
import axios from 'axios';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';
import Aos from 'aos';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import NavbarPartnerLogin from '../../layout/NavbarPartnerLogin/index.jsx';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from '@material-tailwind/react';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [booked, setBooked] = useState([]);
  const navigate = useNavigate();
  const [logPartner, setLogPartner] = useState(false);

  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');
  const [gender, setGender] = useState('');

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

      // Get tours that user booked
      axios
        .get(
          `http://localhost:8080/api/booking/user/${userId}?page=1&pageSize=10`
        )
        .then((response) => {
          const tourBooked = response.data.tour;
          setBooked(tourBooked);
          console.log('tourBooked ne ', tourBooked);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if(user) {
      setUsername(user?.username || '');
      setDob(user?.dob || '');
      setPhoneNumber(user?.phoneNumber || '');
      setEmail(user?.email || '');
      setAvatar(user?.avatar || '');
      setGender(user?.gender || 'Male');
      setAddress(user?.address || '') 
    }
  },[user]);

  const handlePaymentStatus = (isPay) => {
    return isPay ? 'Đã thanh toán' : 'Chưa thanh toán';
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email) || email.includes('@@') || email.endsWith('.vn') || /(\.com.)[^.]*/.test(email)) {
      toast.error('Invalid email format');
      return;
    }
  
    const phonePattern = /^[0-9]{10}$/;
  
    if (!phonePattern.test(phoneNumber)) {
      toast.error('Invalid phone number format');
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/update/${user._id}`,
        {
          username,
          dob,
          phoneNumber,
          email,
          address,
          avatar,
          gender,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      const updatedUser = response.data.data;
      setUser(updatedUser);
      console.log('update user:', updatedUser);
      window.location.href = '/profile';
      toast.success('Update profile successfully!');
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
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
      <section
        className="w-full bg-boat bg-cover bg-bottom bg-no-repeat h-[50vh] flex justify-center bg-color2 bg-blend-multiply bg-opacity-50"
        style={{ height: '70px' }}
      >
        <div className="w-full container flex justify-center items-center flex-col">
          <p className="text-white font-secondary text-3xl 2xl:text-6xl"></p>
        </div>
      </section>

      <section>
        <div className="h-full overflow-x-hidden bg-gray-200 p-8">
          <div className="bg-white rounded-lg shadow-xl pb-8">
            <div className="w-full h-[250px]">
              <img
                src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                className="w-full h-full rounded-tl-lg rounded-tr-lg"
              />
            </div>
            <div className="flex flex-col items-center mt-10">
              <img
                src={user?.avatar}
                className="w-20 h-20 border-4 border-white rounded-full"
              />
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-2xl text-slate-600">{user?.username}</p>
                <span className="bg-blue-500 rounded-full p-1" title="Verified">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-100 h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="4"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
              </div>

              <p className="text-sm text-slate-600">{user?.address}</p>
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={handleClickOpen}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-slate-50 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
                    />
                  </svg>
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>

          <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="w-full flex-1 flex-col">
              <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                <h4 className="text-xl text-gray-900 font-bold">
                  Personal Info
                </h4>
                <ul className="mt-2 text-gray-700">
                  <li className="flex border-y py-2">
                    <span className="font-bold w-24">Full name:</span>
                    <span className="text-gray-700">{user?.username}</span>
                  </li>
                  <li className="flex border-y py-2">
                    <span className="font-bold w-24">Gender:</span>
                    <span className="text-gray-700">
                      {user?.gender === 'true' ? 'Male' : 'Female'}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Birthday:</span>
                    <span className="text-gray-700">
                      {moment(user?.dob).format('DD/MM/YYYY')}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Joined:</span>
                    <span className="text-gray-700">
                      15 Mar 2024 (10 days ago)
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Phone:</span>
                    <span className="text-gray-700">{user?.phoneNumber}</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Email:</span>
                    <span className="text-gray-700">{user?.email}</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Address:</span>
                    <span className="text-gray-700">{user?.address}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-between">
              <h4 className="text-xl text-gray-900 font-bold">
                Tours you booked
              </h4>
              <a href="#" title="View All">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 hover:text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-3 gap-12" style={{ margin: '5rem' }}>
              {booked.length > 0 ? (
                booked.map((tour) => (
                  <Card
                    key={tour?._id}
                    className="w-full max-w-[26rem] shadow-lg px-6 py-6 mb-7 bg-slate-50 hover:bg-slate-200 hover:cursor-pointer"
                  >
                    <CardHeader floated={false} color="blue-gray">
                      <img
                        src={tour.tour_id?.tour_img}
                        style={{ width: '500px', height: '250px' }}
                      />
                      <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                      <IconButton
                        size="sm"
                        color="red"
                        variant="text"
                        className="!absolute top-2 right-6 rounded-full hover:cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6"
                        >
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      </IconButton>
                    </CardHeader>
                    <CardBody>
                      <div className="mb-3 flex items-center justify-between">
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="font-bold font-sans text-2xl text-center pb-2"
                        >
                          {tour.tour_id?.tour_name}
                        </Typography>
                      </div>
                      <Typography color="gray">
                        {tour.tour_id?.tour_description}
                      </Typography>
                      <Typography
                        color="gray"
                        className="bg-slate-100 p-2"
                        style={{ marginTop: '1rem', borderRadius: '5px' }}
                      >
                        <span>Payment status: </span>{' '}
                        <span className="text-red-500">
                          {handlePaymentStatus(tour?.tour_id?.isPay)}
                        </span>
                      </Typography>
                      <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                        <Tooltip content="$129 per night">
                          <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5"
                            >
                              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                              <path
                                fillRule="evenodd"
                                d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                                clipRule="evenodd"
                              />
                              <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                            </svg>
                          </span>
                        </Tooltip>
                        <Tooltip content="Free wifi">
                          <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </Tooltip>
                        <Tooltip content="2 bedrooms">
                          <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5"
                            >
                              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                            </svg>
                          </span>
                        </Tooltip>
                        <Tooltip content={`65" HDTV`}>
                          <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5"
                            >
                              <path d="M19.5 6h-15v9h15V6z" />
                              <path
                                fillRule="evenodd"
                                d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 006 21h12a.75.75 0 000-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zm0 13.5h17.25a.375.375 0 00.375-.375V4.875a.375.375 0 00-.375-.375H3.375A.375.375 0 003 4.875v11.25c0 .207.168.375.375.375z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </Tooltip>
                        <Tooltip content="Fire alert">
                          <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </Tooltip>
                      </div>
                    </CardBody>
                    <CardFooter className="pt-3 gap-6 grid grid-cols-2">
                      {tour?.tour_id?.isPay !== 'true' && (
                        <Button
                          size="md"
                          fullWidth={true}
                          style={{
                            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                          }}
                          className="text-slate-500 bg-slate-300 hover:bg-slate-600 hover:text-slate-50"
                          onClick={() =>
                            navigate(`/payment/${tour.tour_id?._id}`)
                          }
                        >
                          Payment
                        </Button>
                      )}

                      <Button
                        size="md"
                        fullWidth={true}
                        style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}
                        className="text-slate-500 bg-slate-300 hover:bg-slate-600 hover:text-slate-50"
                        onClick={() =>
                          navigate(`/tour-detail/${tour.tour_id?._id}`)
                        }
                      >
                        Detail Tour
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card className="w-full max-w-[26rem] shadow-lg px-6 py-6 mb-7 hover:bg-slate-100 hover:cursor-pointer">
                  <CardHeader floated={false} color="blue-gray">
                    <img src="https://th.bing.com/th/id/OIP.d3Q4E84qw3LPQ2v4NugfDgHaFP?w=275&h=194&c=7&r=0&o=5&pid=1.7" />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                  </CardHeader>
                  <CardBody>
                    <div className="mb-3 flex items-center justify-between">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-medium pb-2 pt-5"
                      >
                        Empty tour history ~
                      </Typography>
                    </div>
                  </CardBody>
                  <CardFooter className="pt-3">
                    <Button
                      size="md"
                      fullWidth={true}
                      className="text-slate-500 hover:bg-slate-300 hover:text-slate-50"
                      onClick={() => navigate('/list-tour')}
                    >
                      Go to booking now
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div> */}
        </div>
      </section>

      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <div className="flex gap-x-96 items-center">
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Edit Profile
            </DialogTitle>
            <CloseIcon onClick={handleClose} className="hover:cursor-pointer" />
          </div>
          <DialogContent dividers>
            {user && (
              <form onSubmit={handleSubmit} key={user?._id}>
                {/* <form  key={user?._id}> */}
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="fullname"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      id="fullname"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required=""
                      defaultValue={user?.username}
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="gender"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Gender
                    </label>
                    <select
                      style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '14px',
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                      }}
                      name="gender"
                      required
                      onChange={(e) => setGender(e.target.value === 'Male')}
                      value={gender ? 'Male' : 'Female'}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select> 
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="birthday"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Birthday
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      id="birthday"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      defaultValue={moment(user?.dob)?.format('YYYY-MM-DD')}
                      onChange={(event) => {
                        setDob(event.target.value);
                      }}
                    />
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="Phone"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      name="Phone"
                      id="Phone"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required=""
                      defaultValue={user?.phoneNumber}
                      onChange={(event) => {
                        setPhoneNumber(event.target.value);
                      }}
                    />
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="Email"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required=""
                      defaultValue={user?.email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="Address"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="Address"
                      id="Address"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      defaultValue={user?.address}
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                    />
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="Address"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Image
                    </label>
                    <input
                      type="text"
                      name="Address"
                      id="Address"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      defaultValue={user?.avatar}
                      onChange={(event) => {
                        setAvatar(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </form>
            )}
          </DialogContent>
          <DialogActions>
            {/* <Button autoFocus type='submit'> */}
            <Button onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    </>
  );
}
