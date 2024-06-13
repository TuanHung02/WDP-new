import React from 'react';
import './PopularTour.scss'

import maldives1 from '../../images/maldives1.jpg'
import Roma from '../../images/2.jpg'
import france1 from '../../images/france1.jpg'
import greece1 from '../../images/greece1.jpg'
import canada1 from '../../images/canada1.jpg'
import Dubai from '../../images/44-1.jpg'
import { useNavigate } from "react-router-dom";

const listTour = [
  {
    id: 1, 
    nameTour: 'Maldives tour', 
    des: 'Travel non lorem ac erat susce bibendum nulla facilisi. Sedeuter nunc voluat miss conse viventa amet vestibulum.', 
    day: '12 Days', 
    nameCountry: 'Maldives', 
    hour: '12+', 
    superb: '9.8 Superb', 
    img: maldives1, 
    price: '$2500 / per persons'
  },
  {
    id: 2, 
    nameTour: 'Roma', 
    des: 'Travel non lorem ac erat susce bibendum nulla facilisi. Sedeuter nunc voluat miss conse viventa amet vestibulum.', 
    day: '6 Days', 
    nameCountry: 'Italy', 
    hour: '10+', 
    superb: '9.5 Superb', 
    img: Roma, 
    price: '$1,300 / per persons'
  },
  {
    id: 3, 
    nameTour: 'France', 
    des: 'Travel non lorem ac erat susce bibendum nulla facilisi. Sedeuter nunc voluat miss conse viventa amet vestibulum.', 
    day: '10 Days', 
    nameCountry: 'France', 
    hour: '6+', 
    superb: '9.5 Superb', 
    img: france1, 
    price: '$400 / per persons'
  },
  {
    id: 4, 
    nameTour: 'Greece tour', 
    des: 'Travel non lorem ac erat susce bibendum nulla facilisi. Sedeuter nunc voluat miss conse viventa amet vestibulum.', 
    day: '10 Days', 
    nameCountry: 'Greece', 
    hour: '12+', 
    superb: '9.3 Superb', 
    img: greece1, 
    price: '$500 / per persons'
  },
  {
    id: 5, 
    nameTour: 'Canada tour', 
    des: 'Travel non lorem ac erat susce bibendum nulla facilisi. Sedeuter nunc voluat miss conse viventa amet vestibulum.', 
    day: '7 Days', 
    nameCountry: 'Canada', 
    hour: '10+', 
    superb: '9.3 Superb', 
    img: canada1, 
    price: '$300 / per persons'
  },
  {
    id: 6, 
    nameTour: 'Dubai tour', 
    des: 'Travel non lorem ac erat susce bibendum nulla facilisi. Sedeuter nunc voluat miss conse viventa amet vestibulum.', 
    day: '7 Days', 
    nameCountry: 'Dubai', 
    hour: '10+', 
    superb: '9.8 Superb', 
    img: Dubai, 
    price: '$200 / per persons'
  },
]

export default function PopularTour() {

  const navigate = useNavigate();

  return (
    <section className="w-full flex justify-center bg-color7 py-8 ">
      <div className="w-full 2xl:px-36">
        <div>
          <p className="text-color4 uppercase px-5">Choose your place</p>
          <p className="text-5xl font-secondary text-color3 px-5">
            Popular <span className="text-color1">Tours</span>
          </p>
          <div className="flex flex-wrap md:justify-between gap-10 px-6 xl:px-0 py-8 lg:px-3 ">
            <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative photo transition-all duration-1000">
              <div className="w-[100%] h-[100%] bottom-photo absolute bg-white flex flex-col justify-center px-5">
                <p className="text-3xl text-color3 capitalize font-secondary">
                  Maldives tour
                </p>
                <p className="text-color1 mb-4">$2,500 / per persons</p>
                <p className="text-color6">
                  Travel non lorem ac erat susce bibendum nulla facilisi.
                  Sedeuter nunc voluat miss conse viventa amet vestibulum.
                </p>
                <div className="flex flex-wrap my-4">
                  <div className="w-[50%] flex">
                    <i className="bi bi-clock text-color4"></i>
                    <p className="text-color6 ms-2">12 Days</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-geo-alt text-color4"></i>
                    <p className="text-color6 ms-2">Maldives</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-person text-color4"></i>
                    <p className="text-color6 ms-2">12+</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-emoji-smile text-color4"></i>
                    <p className="text-color6 ms-2">9.8 Superb</p>
                  </div>
                </div>
                {/* Corrected Line: Removed extra colon after <a> element */}
                <a
                  href=""
                  className="underline decoration-color1 text-color6 flex mb-2"
                  onClick={() => navigate("/tour_detail")}
                >
                  Tour details
                </a>
              </div>
              <img
                src={maldives1}
                alt=""
                className="w-[100%] h-[100%] object-cover brightness-75 absolute"
              />
              <p className="absolute uppercase text-white bg-color3 px-4 py-1 right-1 top-12 rotate-[-90deg] ">
                Maldives
              </p>
              <figcaption className="absolute text-white bottom-8 right-10 fig">
                <p className="capitalize font-secondary text-3xl">
                  Maldives tours
                </p>
                <p className="text-right">$2500 / per persons</p>
              </figcaption>
            </figure>

            <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative photo transition-all duration-1000">
              <div className="w-[100%] h-[100%] bottom-photo absolute bg-white flex flex-col justify-center px-5">
                <p className="text-3xl text-color3 capitalize font-secondary">
                  Roma
                </p>
                <p className="text-color1 mb-4">$1,300 / per person</p>
                <p className="text-color6">
                  Travel non lorem ac erat susce bibendum nulla facilisi.
                  Sedeuter nunc voluat miss conse viventa amet vestibulum.
                </p>
                <div className="flex flex-wrap my-4">
                  <div className="w-[50%] flex">
                    <i className="bi bi-clock text-color4"></i>
                    <p className="text-color6 ms-2">6 Days</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-geo-alt text-color4"></i>
                    <p className="text-color6 ms-2">Italy</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-person text-color4"></i>
                    <p className="text-color6 ms-2">10+</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-emoji-smile text-color4"></i>
                    <p className="text-color6 ms-2">9.5 Superb</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="underline decoration-color1 text-color6 flex mb-2"
                  onClick={() => navigate("/tour_detail")}
                >
                  Tour details
                </a>
              </div>
              <img
                src={Roma}
                alt=""
                className="w-[100%] h-[100%] object-cover brightness-75 absolute"
              />
              <p className="absolute uppercase text-white bg-color3 px-4 py-1 right-1 top-12 rotate-[-90deg] ">
                Italy
              </p>
              {/* Simplified the figcaption */}
              <figcaption className="absolute text-white bottom-8 right-10 fig">
                <p className="capitalize font-secondary text-3xl">Roma</p>
                <p className="text-right">$2500 / per persons</p>
              </figcaption>
            </figure>

            <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative photo transition-all duration-1000">
              <div className="w-[100%] h-[100%] bottom-photo absolute bg-white flex flex-col justify-center px-5">
                <p className="text-3xl text-color3 capitalize font-secondary">
                  France
                </p>
                <p className="text-color1 mb-4">$400 / per person</p>
                <p className="text-color6">
                  Travel non lorem ac erat susce bibendum nulla facilisi.
                  Sedeuter nunc voluat miss conse viventa amet vestibulum.
                </p>
                <div className="flex flex-wrap my-4">
                  <div className="w-[50%] flex">
                    <i className="bi bi-clock text-color4"></i>
                    <p className="text-color6 ms-2">10 Days</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-geo-alt text-color4"></i>
                    <p className="text-color6 ms-2">France</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-person text-color4"></i>
                    <p className="text-color6 ms-2">6+</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-emoji-smile text-color4"></i>
                    <p className="text-color6 ms-2">9.5 Superb</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="underline decoration-color1 text-color6 flex mb-2"
                  onClick={() => navigate("/tour_detail")}
                >
                  Tour details
                </a>
              </div>
              <img
                src={france1}
                alt=""
                className="w-[100%] h-[100%] object-cover brightness-75 absolute"
              />
              <p className="absolute uppercase text-white bg-color3 px-4 py-1 right-1 top-12 rotate-[-90deg] ">
                France
              </p>
              <figcaption className="absolute text-white bottom-8 right-10 fig">
                <p className="capitalize font-secondary text-3xl">France</p>
                <p className="text-right">$400 / per person</p>
              </figcaption>
            </figure>

            <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative photo transition-all duration-1000">
              <div className="w-[100%] h-[100%] bottom-photo absolute bg-white flex flex-col justify-center px-5">
                <p className="text-3xl text-color3 capitalize font-secondary">
                  Greece tour
                </p>
                <p className="text-color1 mb-4">$500 / per person</p>
                <p className="text-color6">
                  Travel non lorem ac erat susce bibendum nulla facilisi.
                  Sedeuter nunc voluat miss conse viventa amet vestibulum.
                </p>
                <div className="flex flex-wrap my-4">
                  <div className="w-[50%] flex">
                    <i className="bi bi-clock text-color4"></i>
                    <p className="text-color6 ms-2">10 Days</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-geo-alt text-color4"></i>
                    <p className="text-color6 ms-2">Greece</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-person text-color4"></i>
                    <p className="text-color6 ms-2">12+</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-emoji-smile text-color4"></i>
                    <p className="text-color6 ms-2">9.3 Superb</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="underline decoration-color1 text-color6 flex mb-2"
                  onClick={() => navigate("/tour_detail")}
                >
                  Tour details
                </a>
              </div>
              <img
                src={greece1}
                alt=""
                className="w-[100%] h-[100%] object-cover brightness-75 absolute"
              />
              <p className="absolute uppercase text-white bg-color3 px-4 py-1 right-[-15px] top-12 rotate-[-90deg] ">
                Greece
              </p>
              <figcaption className="absolute text-white bottom-8 right-10 fig">
                <p className="capitalize font-secondary text-3xl">
                  Greece tours
                </p>
                <p className="text-right">$500 / per person</p>
              </figcaption>
            </figure>

            <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative photo transition-all duration-1000">
              <div className="w-[100%] h-[100%] bottom-photo absolute bg-white flex flex-col justify-center px-5">
                <p className="text-3xl text-color3 capitalize font-secondary">
                  Canada tour
                </p>
                <p className="text-color1 mb-4">$300 / per person</p>
                <p className="text-color6">
                  Travel non lorem ac erat susce bibendum nulla facilisi.
                  Sedeuter nunc voluat miss conse viventa amet vestibulum.
                </p>
                <div className="flex flex-wrap my-4">
                  <div className="w-[50%] flex">
                    <i className="bi bi-clock text-color4"></i>
                    <p className="text-color6 ms-2">7 Days</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-geo-alt text-color4"></i>
                    <p className="text-color6 ms-2">Canada</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-person text-color4"></i>
                    <p className="text-color6 ms-2">10+</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-emoji-smile text-color4"></i>
                    <p className="text-color6 ms-2">9.3 Superb</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="underline decoration-color1 text-color6 flex mb-2"
                  onClick={() => navigate("/tour_detail")}
                >
                  Tour details
                </a>
              </div>
              <img
                src={canada1}
                alt=""
                className="w-[100%] h-[100%] object-cover brightness-75 absolute"
              />
              <p className="absolute uppercase text-white bg-color3 px-4 py-1 right-[-15px] top-12 rotate-[-90deg] ">
                Canada
              </p>
              <figcaption className="absolute text-white bottom-8 right-10 fig">
                <p className="capitalize font-secondary text-3xl">
                  Canada tours
                </p>
                <p className="text-right">$300 / per person</p>
              </figcaption>
            </figure>

            <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative photo transition-all duration-1000">
              <div className="w-[100%] h-[100%] bottom-photo absolute bg-white flex flex-col justify-center px-5">
                <p className="text-3xl text-color3 capitalize font-secondary">
                  Dubai
                </p>
                <p className="text-color1 mb-4">$200 / per person</p>
                <p className="text-color6">
                  Travel non lorem ac erat susce bibendum nulla facilisi.
                  Sedeuter nunc voluat miss conse viventa amet vestibulum.
                </p>
                <div className="flex flex-wrap my-4">
                  <div className="w-[50%] flex">
                    <i className="bi bi-clock text-color4"></i>
                    <p className="text-color6 ms-2">7 Days</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-geo-alt text-color4"></i>
                    <p className="text-color6 ms-2">Dubai</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-person text-color4"></i>
                    <p className="text-color6 ms-2">10+</p>
                  </div>
                  <div className="w-[50%] flex">
                    <i className="bi bi-emoji-smile text-color4"></i>
                    <p className="text-color6 ms-2">9.8 Superb</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="underline decoration-color1 text-color6 flex mb-2"
                  onClick={() => navigate("/tour_detail")}
                >
                  Tour details
                </a>
              </div>
              <img
                src={Dubai}
                alt=""
                className="w-[100%] h-[100%] object-cover brightness-75 absolute"
              />
              <p className="absolute uppercase text-white bg-color3 px-4 py-1 right-[-15px] top-12 rotate-[-90deg] ">
                Dubai
              </p>
              <figcaption className="absolute text-white bottom-8 right-10 fig">
                <p className="capitalize font-secondary text-3xl">Dubai</p>
                <p className="text-right">$200 / per person</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
