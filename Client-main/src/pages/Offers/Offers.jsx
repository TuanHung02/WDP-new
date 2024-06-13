import React, {useEffect} from 'react';
import './Offers.scss';
import {
  MdKingBed,
  MdBathtub,
  MdAirportShuttle,
  MdLocationOn,
} from 'react-icons/md';
import { FaWifi } from 'react-icons/fa';
import { BsArrowRightShort } from 'react-icons/bs';

import img from '../../images/image_hotel(1).jpg';
import img2 from '../../images/image_hotel(2).jpg';
import img3 from '../../images/image_hotel(3).jpg';
import img4 from '../../images/image_hotel(4).jpg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Aos from 'aos';
import 'aos/dist/aos.css'

const offers = [
  {
    id: 1,
    imgSrc: img,
    destTitle: 'Machu Picchu',
    location: 'Peru',
    price: '7,452',
  },
  {
    id: 1,
    imgSrc: img2,
    destTitle: 'Machu Picchu',
    location: 'Peru',
    price: '5,476',
  },
  {
    id: 1,
    imgSrc: img3,
    destTitle: 'Machu Picchu',
    location: 'Peru',
    price: '4,000',
  },
  // {
  //   id: 1,
  //   imgSrc: img4,
  //   destTitle: 'Machu Picchu',
  //   location: 'Peru',
  //   price: '8,234',
  // },
];

export default function Offers() {

  useEffect(()=> {
    Aos.init({duration:2000})
  }, [])

  const notify = () => toast("Feature being updated, please come back later!");

  return (
    <section className="offer section container">
      <div className="secContainer">
        <div data-aos="fade-up" data-aos-duration="2500" className="secIntro">
          <h2 className="secTitle font-bold text-xl">Special Offers</h2>
          <p>
            From historical cities to natural specteculars, come see the best of
            the world!
          </p>
        </div>

        <div className="mainContent grid">
          {
          offers.map(({id, imgSrc,destTitle, location, price }) => {
            return (
              <div data-aos="fade-up" data-aos-duration="3000" className="singleOffer">
                <div className="destImage">
                  <img src={imgSrc} alt={destTitle} />

                  <span className="discount">30% Off</span>
                </div>

                <div className="offerBody">
                  <div className="price flex">
                    <h4>$ {price}</h4>
                    <span className="status">For rent</span>
                  </div>

                  <div className="amenities flex">
                    <div className="singleAmenity flex">
                      <MdKingBed className="icon" />
                      <small>2 Beds</small>
                    </div>
                    <div className="singleAmenity flex">
                      <MdBathtub className="icon" />
                      <small>1 Bath</small>
                    </div>
                    <div className="singleAmenity flex">
                      <FaWifi className="icon" />
                      <small>Wi-fi</small>
                    </div>
                    <div className="singleAmenity flex">
                      <MdAirportShuttle className="icon" />
                      <small>Shuttle</small>
                    </div>
                  </div>

                  <div className="location flex">
                    <MdLocationOn className="icon" />
                    <small>456 Vine #319, {location}</small>
                  </div>

                  <button className="btn flex">
                    View Details
                    <BsArrowRightShort className="icon"  onClick={notify}/>
                  </button>
                </div>
              </div>
            );
          })
          }
        </div>
      </div>
    </section>
  );
}
