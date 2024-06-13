import './Header.scss'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = ({ dataSearch }) => {
  const [tours, setTours] = useState([]);
  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [location, setLocation] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    // Get api tours
    axios.get('http://localhost:8080/api/tour/find-all')
      .then((response) => {
        const tourData = response.data.tours;
        setTours(tourData);
      })
      .catch(error => console.log(error));

    // Get api locations
    axios.get('http://localhost:8080/api/location/all')
      .then((response) => {
        const locationData = response.data.locations.locationSaved;
        setLocation(locationData);
      })
      .catch(error => console.log(error));
  }, []);

  // Search feature
  const handleSubmit = async (event) => {

    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/tour/get-list-search-tour?page=1&pageSize=10', {
        start_position: startPosition,
        end_position: endPosition,
        start_date: searchDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        const responseData = await response.data.tours.tours[0];
        console.log('Search successful:', responseData);
        setSearchData(responseData);
        dataSearch(responseData);
        toast.success('Please wait few secondes...')
        // navigate('/');
      } else {
        console.error('Search failed:', response.status);
        const errorData = await response.data.error;
        console.error('Error Data:', errorData);
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error Data:', error);
      toast.error('There are no tours like you are looking for ~ Try to find other tours!');
    }
  };

  const searchParams = {
    startPosition,
    endPosition,
    searchDate,
  };


  return (
    <section className="home">
      <div className="secContainer container">

        <div className="homeText">
          <h1 data-aos="fade-up" className="title font-bold text-2xl">
            Plan Your Trip With Travel Dot
          </h1>

          <p data-aos="fade-up" data-aos-duration="2500" className="subTitle ">
            Travel to your favourite city with respectful of the enviroment!
          </p>

          <button data-aos="fade-up" data-aos-duration="3000" className="btn">
            <a href="/list-tour">Explore Now</a>
          </button>

        </div>

        <div className="homeCard grid">
          <div data-aos="fade-right" data-aos-duration="2000" className="locationDiv">
            <label htmlFor="location">Start place</label>
            <select value={startPosition} onChange={(e) => setStartPosition(e.target.value)}>
              <option value="">Choose Start Position</option>
              {location.map((loc) => (
                <option value={loc._id} key={loc._id}>
                  {loc?.location_name}
                </option>
              ))}
            </select>
          </div>
          <div data-aos="fade-right" data-aos-duration="2500" className="distDiv">
            <label htmlFor="location">End place</label>
            <select value={endPosition} onChange={(e) => setEndPosition(e.target.value)}>
              <option value="">Choose End Position</option>
              {location.map((loc) => (
                <option value={loc._id} key={loc._id}>
                  {loc?.location_name}
                </option>
              ))}
            </select>
          </div>
          <div data-aos="fade-right" data-aos-duration="3000" className="priceDiv">
            <label htmlFor="price">Date</label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              placeholder="Search Date here"
            />
          </div>
          <button data-aos="fade-left" data-aos-duration="2000" className="btn" onClick={handleSubmit}>
            Search
          </button>
        </div>
      </div>
    </section>
  )
}

export default Header
