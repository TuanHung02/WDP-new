import React, { useState } from 'react';
import { Footer, Navbar, NavbarLogin } from '@/layout';
import Aos from 'aos';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { jwtDecode } from 'jwt-decode';
import NavbarPartnerLogin from '../../layout/NavbarPartnerLogin/index.jsx';
import axios from 'axios';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logPartner, setLogPartner] = useState(false);
  const [user, setUser] = useState({});
  const [booked, setBooked] = useState([]);
  const [bookedPaid, setBookedPaid] = useState([]);
  const [mergedBooked, setMergedBooked] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    Aos.init({ duration: 2000 });
    setIsLoggedIn(Boolean(token));
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;

      const fetchUserData = async () => {
        try {
          const userDataResponse = await axios.get(`http://localhost:8080/api/user/${userId}`);
          const userData = userDataResponse.data.data;
          setUser(userData);

          const rid = decodedToken.role;
          if (rid === 'PARTNER') {
            setLogPartner(true);
          } else {
            setLogPartner(false);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      };

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
      };

      fetchUserData();
      fetchBookedData();
    }
  }, []);

  const handlePaymentStatus = (isPay) => {
    return isPay ? 'Đã thanh toán' : 'Chưa thanh toán';
  };

  const isPaid = (payId) => {
    const bookPaid = booked.find(p => {
      return p.isPay === true
    })
    return bookPaid
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

      <div style={{ marginBottom: '8rem' }}>
        <section className="w-full bg-boat bg-cover bg-bottom bg-no-repeat h-[50vh] flex justify-center bg-color2 bg-blend-multiply bg-opacity-50">
          <div className="w-full container flex justify-center items-center flex-col">
            <p className="text-white font-secondary text-3xl 2xl:text-6xl">
              History Booking
            </p>
          </div>
        </section>

        <div className="mt-16">
          <div data-aos="fade-up" data-aos-duration="2500" className="secIntro">
            <h2 className="secTitle font-bold text-xl">
              Explore the tours you have booked
            </h2>
            <p>Track information and status of the tours you have booked</p>
          </div>
        </div>

        <div className="grid grid-cols-3" style={{ margin: '5rem' }}>
          {Array.isArray(mergedBooked) ? (
            mergedBooked.map((tour) => (
              <Card
                key={tour?._id}
                className="w-full max-w-[26rem] shadow-lg px-6 py-6 mb-7 bg-slate-50 hover:bg-slate-200 hover:cursor-pointer"
              >
                <CardHeader floated={false} color="blue-gray">
                  <img src={tour.tour_id?.tour_img} style={{ width: '500px', height: '300px' }} />
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
                    <span>Payment status : </span>{' '}
                    <span className="text-red-500">
                      {handlePaymentStatus(tour?.isPay)}
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
                {tour?.isPay ? (
                  <CardFooter className="pt-3 flex justify-center">
                    <Button
                      size="md"
                      fullWidth={true}
                      style={{
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                      }}
                      className="text-slate-500 bg-slate-300 hover:bg-slate-600 hover:text-slate-50"
                      onClick={() => navigate(`/tour-detail/${tour.tour_id?._id}`)}
                    >
                      Detail Tour
                    </Button>
                  </CardFooter>

                ) : (
                  <CardFooter className="pt-3 gap-6 grid grid-cols-2">
                    <Button
                      size="md"
                      fullWidth={true}
                      style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}
                      className="text-slate-500 bg-slate-300 hover:bg-slate-600 hover:text-slate-50"
                      onClick={() =>
                        navigate(`/payment/${tour.tour_id?._id}`)
                      }
                    >
                      Payment
                    </Button>

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
                )}

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
      </div>

      <Footer />
    </>
  );
};

export default Index;
