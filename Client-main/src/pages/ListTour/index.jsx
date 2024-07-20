import React, { useState, useEffect } from 'react';
import './listTour.scss';
import { Navbar, NavbarLogin, Footer } from '@/layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Aos from 'aos';
import { jwtDecode } from 'jwt-decode';
import NavbarPartnerLogin from '../../layout/NavbarPartnerLogin/index.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
} from '@mui/material';
// import { useLocation } from 'react-router-dom';

const listFilter = [
  {
    id: 1,
    name: 'Price',
    item1: 'Less than $500',
    item2: '$500 - $1000',
    item3: '$1000 - $2000',
    item4: '$2000+ ',
  },
  // {
  //   id: 4,
  //   name: 'Star Rating ',
  //   item1: '1',
  //   item2: '2',
  //   item3: '3',
  //   item4: '4',
  //   item5: '5',  
  // }
];

export default function index() {
  // const location = useLocation();
  // const searchData = location.state?.searchData;

  const [isOpen, setIsOpen] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const timeNow = new Date().toISOString();

  const toggleDropdown = (id) => {
    setIsOpen({ ...isOpen, [id]: !isOpen[id] });
  };

  const [tours, setTours] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [bookingId, setBookingId] = useState([]);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState([]);
  const [hasFilteredTours, setHasFilteredTours] = useState(true);
  const [booked, setBooked] = useState([]);
  const [user, setUser] = useState([])
  const [payId, setPayId] = useState([]);
  const [logPartner, setLogPartner] = useState(false);
  const [searchTour, setSearchTour] = useState([]);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    setIsLoggedIn(Boolean(token));
    // Rest API all tours 
    axios.get('http://localhost:8080/api/tour/find-all')
      .then((response) => {
        const tourData = response.data.tours;
        const approvedTours = tourData.filter(tour => tour.isAppove === 'APPROVE' &&  tour.start_date >= new Date().toISOString() );
        // if(searchData){
        //   setTours(searchData);
        // }
        // console.log(searchData);
        setTours(approvedTours);
        setHasFilteredTours(approvedTours.length > 0);
      })
      .catch(error => console.log(error));

    // Rest API Booked
    axios.get('http://localhost:8080/api/booking/all')
      .then((response) => {
        const booked = response.data.getAllTourBooked;
        setBooked(booked);
      })
      .catch(error => console.log(error));
  }, []);

  // Get user id
  const token = localStorage.getItem('token');
  let userId = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.user_id;
  }

  useEffect(() => {
  }, [tours]);

  const handleClickUser = (tourId) => {
    setSelectedUserId(tourId);
    navigate(`/tour-detail/${tourId}`);
  }

  const handleBooking = (tourId) => {
    setBookingId(tourId);
    navigate(`/booking-tour/${tourId}`);
  }

  const handlePay = (payId) => {
    setPayId(payId);
    navigate(`/payment/${payId}`);
  }

  const handlePriceFilter = (price) => {
    let priceFilter;
    if (price === listFilter[0].item1) {
      setSelectedPriceFilter(tours.filter((tour) => tour?.isAppove === "APPROVE" && tour.tour_price < 500 && tour.start_date >= new Date().toISOString()));
    } else if (price === listFilter[0].item2) {
      setSelectedPriceFilter (tours.filter((tour) => tour?.isAppove === "APPROVE" && tour.tour_price >= 500 && tour.tour_price <= 1000 && tour.start_date>= new Date().toISOString()));
    } else if (price === listFilter[0].item3) {
      setSelectedPriceFilter (tours.filter((tour) => tour?.isAppove === "APPROVE" && tour.tour_price >= 1000 && tour.tour_price <= 2000 && tour.start_date >= new Date().toISOString()));
    } else if (price === listFilter[0].item4) {
      setSelectedPriceFilter( tours.filter((tour) => tour?.isAppove === "APPROVE" && tour.tour_price > 2000 && tour.start_date >= new Date().toISOString()));
    }
    // setSelectedPriceFilter(priceFilter);
    setIsOpen(true);
    setStatus(false)
  };

  const isTourBooked = (tourId) => {
    const tour = booked.find(t => {
      return t.user_id === userId && t.tour_id === tourId
    })
    return tour ? true : false;
  }

  const getBookedTour = (tourId) => {
    const tour = booked.find(t => {
      return t.user_id === userId && t.tour_id === tourId
    })
    return tour;
  }

  // Conditional of loop
  const applyPriceFilter = (tours) => {
    if (selectedPriceFilter === null) {
      return tours.filter(tour => tour?.isAppove === "APPROVE" && new Date(tour.start_date) >= new Date(timeNow));
    } else if (selectedPriceFilter === listFilter[0].item1) {
      return tours.filter((tour) => tour?.isAppove === "APPROVE" && tour.tour_price < 500 && new Date(tour.start_date) >= new Date(timeNow));
    } else if (selectedPriceFilter === listFilter[0].item2) {
      return tours.filter((tour) => tour?.isAppove === "APPROVE" && tour.tour_price >= 500 && tour.tour_price <= 1000 && new Date(tour.start_date) >= new Date(timeNow));
    } else if (selectedPriceFilter === listFilter[0].item3) {
      return tours.filter((tour) => tour?.isAppove === "APPROVE" && tour.tour_price >= 1000 && tour.tour_price <= 2000 && new Date(tour.start_date) >= new Date(timeNow));
    } else if (selectedPriceFilter === listFilter[0].item4) {
      return tours.filter((tour) => tour?.isAppove === "APPROVE" && tour.tour_price > 2000 && new Date(tour.start_date) >= new Date(timeNow));
    } else {
      return tours.filter(tour => tour.isApprove === "APPROVE" && new Date(tour.start_date) >= new Date(timeNow));
    }
  };


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8080/api/tour/search?page=1&pageSize=10&query=${searchTour}`);
      const searchedTour = response.data.tours;
      setTours(searchedTour);
      // setStatus(false)
      toast.success('Wait a few seconds ~')
    } catch (error) {
      const errorData = error.response.data.error;
      console.log(errorData);
      setStatus(true)
      toast.error(errorData)
    }
  };

  // const handleSubmit = (e) => {
  //   const listSearchTour = tours.filter(tour => tour.tour_name.toLowerCase().includes(searchTour.toLowerCase()));
  //   setTours(listSearchTour);
  // };

  useEffect(() => {
    console.log(searchTour);
  }, [searchTour]);


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
      <section className="home">
      <div className="secContainer container">
        <div className="homeText">
          <h1 data-aos="fade-up" className="title font-bold text-2xl">
            List Tour
          </h1>
        </div>
      </div>
    </section>

      {/* Filter tour */}
      <section className="mt-[4rem] mb-[1.5rem]">
        <div className="">
          <div className="">
            <div className="flex justify-evenly items-center">
              <div className="flex flex-wrap justify-around items-center gap-[1rem]">
                <div className="text-lg font-semibold mr-3">Search Filter</div>

                {listFilter.map((list) => (
                  <div
                    key={list.id}
                    className="flex justify-around mt-[0.4rem]"
                  >
                    <div className="dropdownButton">
                      <button
                        id={`dropdownDefaultButton-${list.id}`}
                        onClick={() => toggleDropdown(list.id)}
                        className="dropdown-item text-slate-600 bg-white hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5.0 py-1.5 text-center inline-flex items-center"
                        type="button"
                      >
                        {list.name}
                        <svg
                          className="w-2.5 h-2.5 ms-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>

                      <div
                        id={`dropdown-${list.id}`}
                        className={`${isOpen[list.id] ? 'block' : 'hidden'
                          } absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                      >
                        <ul
                          class="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby={`dropdownDefaultButton-${list.id}`}
                        >
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={() => handlePriceFilter(list.item1)}
                            >
                              {list.item1}
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={() => handlePriceFilter(list.item2)}
                            >
                              {list.item2}
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={() => handlePriceFilter(list.item3)}
                            >
                              {list.item3}
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={() => handlePriceFilter(list.item4)}
                            >
                              {list.item4}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Grid item sm={5} style={{ textAlign: 'right' }}>
                <div
                  style={{
                    marginBottom: '1rem',
                    textAlign: 'right',
                  }} >
                  <form className="max-w-sm" onSubmit={handleSubmit}>
                    <label
                      for="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
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
                        type="search"
                        id="default-search"
                        className="inputStyle block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search tour name..."
                        required
                        onChange={(e) => { setSearchTour(e.target.value) }}
                      />
                      <button
                        type="submit"
                        className="btnSearch text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </Grid>
            </div>
          </div>
        </div>
      </section>



      <hr className="container mt-[4rem]" />

      
      {status === true ? (
        <section className="mt-[4rem] container">
          <div className="flex flex-wrap  gap-10 px-6 xl:px-0 py-8 lg:px-3">
          {tours.map( (tour) => (
            <Card key={tour._id} style={{ width: '26rem'}}>
            <div>
              <img  src={tour.tour_img[0]} style={{ height: '300px'}}/>
              <div style={{padding: '10px'}}>
                <h1 style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  font: '20px sans-serif'
                }}>
                  <strong>{tour.tour_name}</strong>
               </h1>

                <h3>Start position: <b>{tour.start_position?.location_name}</b></h3>
                <h3>Time: <b>{tour.duration} days {tour.duration -1 } night</b></h3>
                <h3>Price: <b>{tour.tour_price}$</b></h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <button   
                style={{marginTop: '10px', marginBottom: '5px', color: 'white'}} 
                className="btn btn-primary" 
                onClick={() => handleClickUser(tour._id)}
                >
                Detail
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleBooking(tour._id)}
                  style={{marginTop: '10px', marginBottom: '5px', color: 'white'}}
                >
                  Book now
                </button>
                </div>
              </div>
              </div>
            </Card>
          ))}
          </div>
        </section>
      ):( 
         <section className="mt-[4rem] container">
          <div className="flex flex-wrap  gap-10 px-6 xl:px-0 py-8 lg:px-3">
          {selectedPriceFilter.map( (tourP) => (
            <Card key={tourP._id} style={{ width: '26rem'}}>
            <div>
              <img  src={tourP.tour_img[0]} style={{ height: '300px'}}/>
              <div style={{padding: '10px'}}>
                <h1 style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%'
                }}>
                  <strong>{tourP.tour_name}</strong>
               </h1>

                <h3>Start position: <b>{tourP.start_position?.location_name}</b></h3>
                <h3>Time: <b>{tourP.duration} days {tourP.duration -1 } night</b></h3>
                <h3>Price: <b>{tourP.tour_price}$</b></h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <button   
                style={{marginTop: '10px', marginBottom: '5px', color: 'white'}} 
                className="btn btn-primary" 
                onClick={() => handleClickUser(tourP._id)}
                >
                Detail
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleBooking(tourP._id)}
                  style={{marginTop: '10px', marginBottom: '5px', color: 'white'}}
                >
                  Book now
                </button>
                </div>
              </div>
              </div>
            </Card>
          ))}
          </div>
        </section>
      )}

      {/* Paging  */}
      {/* <div class="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
        <div class="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
          <div class="flex items-center pt-3 text-gray-600 hover:text-orange-400 cursor-pointer">
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.1665 4L4.49984 7.33333"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.1665 4.00002L4.49984 0.666687"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p class="text-sm ml-3 font-medium leading-none">Previous</p>
          </div>
          <div class="sm:flex hidden">
            <p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
              1
            </p>
            <p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
              2
            </p>
            <p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
              3
            </p>
            <p class="text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2">
              4
            </p>
            <p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
              5
            </p>
            <p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
              6
            </p>
            <p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
              7
            </p>
            <p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
              8
            </p>
          </div>
          <div class="flex items-center pt-3 text-gray-600 hover:text-orange-400 cursor-pointer">
            <p class="text-sm font-medium leading-none mr-3">Next</p>
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.5 7.33333L12.8333 4"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.5 0.666687L12.8333 4.00002"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div >
      </div> */}

      <div className="text-gray-400 text-sm flex justify-center mb-[6rem]">
        <span className="mr-1 font-bold">1</span> -
        <span className="mr-1 font-bold">20</span> of
        <span className="mr-1 ml-1 font-bold">300+</span> properties found
      </div>

      <Footer />
    </>
  );
}