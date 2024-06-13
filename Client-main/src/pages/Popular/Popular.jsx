import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import './Popular.scss';
import { BsArrowLeftShort, BsArrowRightShort, BsDot } from 'react-icons/bs';
import DataContext from '../../layout/ContextData/ContextData.jsx';
import { useNavigate } from 'react-router-dom';

// import the images
import img from '../../images/image(1).jpg';
import img2 from '../../images/image(2).jpg';
import img3 from '../../images/image(3).jpg';
import img4 from '../../images/image(4).jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const Data = [
  {
    id: 1,
    imgSrc: img,
    destTitle: 'Machu Picchu',
    location: 'Peru',
    grade: 'CULTURAL RELAX',
  },
  {
    id: 2,
    imgSrc: img2,
    destTitle: 'Machu Picchu',
    location: 'Peru',
    grade: 'CULTURAL RELAX',
  },
  {
    id: 3,
    imgSrc: img3,
    destTitle: 'Machu Picchu',
    location: 'Peru',
    grade: 'CULTURAL RELAX',
  },
  {
    id: 4,
    imgSrc: img4,
    destTitle: 'Machu Picchu',
    location: 'Peru',
    grade: 'CULTURAL RELAX',
  },
];

export default function Popular() {
  const headerData = useContext(DataContext);
  const headerDataArray = JSON.parse(JSON.stringify(headerData));
  const [tours, setTours] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);

  const handleClickUser = (tourId) => {
    setSelectedUserId(tourId);
    navigate(`/tour-detail/${tourId}`);
  }

  useEffect(() => {
    Aos.init({ duration: 2000 });
    axios.get('http://localhost:8080/api/tour/find-all')
      .then((response) => {
        const tourData = response.data.tours;
        const list = [];
        for (let i = 0; i < 4; i++) {
          list.push(tourData[i])
        }
        setTours(list);
      })
      .catch(error => console.log(error));
  }, []);

  const [selectedTourId, setSelectedTourId] = useState([]);
  const navigate = useNavigate();

  const handleClickTour = (tourId) => {
    setSelectedTourId(tourId);
    navigate(`/tour-detail/${tourId}`);
  }

  const notify = () => toast("Feature being updated, please come back later!");

  return (
    <section className="popular container">
      {headerData.length != [] ? (
        <div className="secContainer">
          <div className="secHeader flex">
            <div data-aos="fade-right" data-aos-duration="2500" className="textDiv">
              <h2 className="secTitle font-bold">Tour just searched...</h2>
              <p>
                Hope your expectations are met!
              </p>
            </div>

            {/* <div data-aos="fade-left" data-aos-duration="2500" className="iconsDiv flex">
              <BsArrowLeftShort className="icon leftIcon" />
              <BsArrowRightShort className="icon" />
            </div> */}
          </div>

          <div className="mainContent grid">
            {[headerDataArray].map((tour) => {
              const id = tour.tour_id;
              return (
                <div data-aos="fade-up" className="singleDestination" key={tour._id}>
                  <div className="destImage">
                    <img src={tour.tour_img} alt="Image title" />
                    <div className="overlayInfo">
                      <h3 className="font-bold text-lg">{tour.tour_description}</h3>
                      <p>{tour.start_position?.location_name}</p>
                      <BsArrowRightShort className="icon" onClick={() => handleClickTour(tour._id)} />
                    </div>
                  </div>

                  <div className="destFood">
                    <div className="number font-sans">{tour.end_position[0]?.location_name}</div>
                    <div className="destText flex">
                      <span>{tour.tour_name}</span>
                      <span className="flex">
                        <span className="dot">
                          <BsDot className="icon" />
                        </span>
                        Book now
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="secContainer">
          <div className="secHeader flex">
            <div data-aos="fade-right" data-aos-duration="2500" className="textDiv">
              <h2 className="secTitle font-bold">New Destination</h2>
              <p>
                From historical cities to natural spectacles, come see the best
                of the world!
              </p>
            </div>

            <div data-aos="fade-left" data-aos-duration="2500" className="iconsDiv flex">
              <button
                onClick={() => navigate('/list-tour')}
                className='button-78'
              >See more...
              </button>
            </div>
          </div>

          <div className="mainContent grid">
            {tours.map((list) => {
              return (
                <div data-aos="fade-up" className="singleDestination" key={list._id}>
                  <div className="destImage">
                    <img src={list.tour_img} alt="Image title" />

                    <div className="overlayInfo">
                      <h3 className="font-bold text-lg">{list.tour_name}</h3>
                      <p>{ }</p>

                      <BsArrowRightShort className="icon" onClick={() => handleClickUser(list._id)} />
                    </div>
                  </div>

                  <div className="destFood">
                    <div className="number">{list.start_position?.location_name}</div>

                    <div className="destText flex">
                      <h6>{ }</h6>
                      <span className="flex">
                        <span className="dot">
                          <BsDot className="icon" />
                        </span>
                        Book now
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section >
  );
}