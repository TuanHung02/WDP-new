import React, { useEffect, useState } from 'react';
import { Navbar, Footer, NavbarLogin } from "@/layout";
import NavbarAdminLogin from "../../layout/NavbarAdminLogin/index.jsx";
import './Home.scss';
import Popular from "../Popular/Popular.jsx";
import Offers from "../Offers/Offers.jsx";
import About from "../About/About.jsx";
import Blog from "../Blog/Blog.jsx";
import Header from "../../layout/Header/index.jsx";
import Aos from 'aos';
import 'aos/dist/aos.css';
import PopularTour from '../Popular/PopularTour.jsx';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import DataContext from '../../layout/ContextData/ContextData.jsx';
import { useContext } from 'react';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logAdmin, setLogAdmin] = useState(false);
  const [headerData, setHeaderData] = useState([]);

  // State context data
  const [data, setData] = useState('alo test');
  const [user, setUser] = useState({});

  useEffect(() => {
    Aos.init({ duration: 2000 });
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token));
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;
      axios.get(`http://localhost:8080/api/user/${userId}`)
        .then((response) => {
          const userData = response.data.data;
          setUser(userData);
          const rid = decodedToken.role_id;
          if (rid === 'ADMIN') {
            setLogAdmin(true);
          } else {
            setLogAdmin(false);
          }
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  }, []);

  if (!user) {
    return (
      <div> Loading...
      </div>
    );
  }

  const handleApiData = (dataAfterSearch) => {
    setHeaderData(dataAfterSearch);
  };

  return (
    <>
      {isLoggedIn ? (logAdmin ? <NavbarAdminLogin /> : <NavbarLogin />) : <Navbar />}
      <Header dataSearch={handleApiData} />
      <DataContext.Provider value={headerData}>
        <Popular />
      </DataContext.Provider>
      <PopularTour />
      <Offers />
      <About />
      <Blog />
      <Footer />
    </>
  );
};

export default Home;