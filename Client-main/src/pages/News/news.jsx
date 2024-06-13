import React, { useState } from 'react';
import { Footer, Navbar, NavbarLogin } from "@/layout";
import './news.scss'
import Aos from 'aos';
import { useEffect } from 'react';

import img from '../../images/22.jpeg'
import img2 from '../../images/11.jpeg'
import img3 from '../../images/18-1.jpeg'

import { jwtDecode } from 'jwt-decode';
import NavbarPartnerLogin from '../../layout/NavbarPartnerLogin/index.jsx';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

export default function news() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token));
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
          console.log(decodedToken)
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
  const [user, setUser] = useState({});

  const notify = () => toast("Feature being updated, please come back later!");

  return (
    <>

      {/* {isLoggedIn ? <NavbarLogin /> : <Navbar />} */}
      {isLoggedIn ? (
        logPartner ? (
          <NavbarPartnerLogin />
        ) : (
          <NavbarLogin />
        )
      ) : (
        <Navbar />
      )}

      <div>
        <section className="w-full bg-boat bg-cover bg-bottom bg-no-repeat h-[50vh] flex justify-center bg-color2 bg-blend-multiply bg-opacity-50">
          <div className="w-full container flex justify-center items-center flex-col">
            <p className="text-white font-secondary text-3xl 2xl:text-6xl">
              News
            </p>
          </div>
        </section>

        <section className="w-full flex justify-center bg-color3 py-8 h-auto">
          <div className="w-full 2xl:px-36 h-auto">
            <div style={{ marginBottom: '6rem', marginTop: '6rem' }}>
              <p className="text-color4 uppercase px-5">TRAVEL NEWS</p>
              <p className="text-5xl font-secondary text-color4 px-5 mb-5">
                Travel<span className="text-white"> Experience</span>
              </p>
              <div className="flex flex-wrap justify-center xl:justify-between gap-10 px-6 xl:px-0 py-8 lg:px-3 ">
                <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000  group mb-20   ">
                  <div className="w-[100%] h-[100%] overflow-hidden group transition-all duration-1000 relative">
                    {' '}
                    <img
                      src={img}
                      alt=""
                      className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
                    />
                  </div>
                  <div className="absolute uppercase text-white bg-color1 px-2 left-3 top-12 flex flex-col items-center ">
                    <p>Aug</p>
                    <p className="font-bold">02</p>
                  </div>
                  <figcaption onClick={() => notify()} className="hover:cursor-pointer absolute h-[150px] w-[85%]  bg-white bottom-[-80px]  left-[8%] flex flex-col justify-center px-8 group-hover:bottom-10 transition-all duration-1000 ">
                    <p className="uppercase text-color4 font-bold">Tours</p>
                    <p className="capitalize text-color3 font-secondary text-xl text-center mt-4 font-semibold">
                      most popular yacht charter routes{' '}
                    </p>
                  </figcaption>
                </figure>
                <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000  group mb-20   ">
                  <div className="w-[100%] h-[100%] overflow-hidden group transition-all duration-1000 relative">
                    {' '}
                    <img
                      src={img2}
                      alt=""
                      className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
                    />
                  </div>
                  <div className="absolute uppercase text-white bg-color1 px-2 left-3 top-12 flex flex-col items-center ">
                    <p>Aug</p>
                    <p className="font-bold">07</p>
                  </div>
                  <figcaption onClick={() => notify()} className="hover:cursor-pointer absolute h-[150px] w-[85%]  bg-white bottom-[-80px]  left-[8%] flex flex-col justify-center px-3 group-hover:bottom-10 transition-all duration-1000 ">
                    <p className="uppercase text-color4 font-bold">travel</p>
                    <p className="capitalize text-color3 font-secondary text-xl text-center mt-4 font-semibold">
                      practical information for travelling to egypt
                    </p>
                  </figcaption>
                </figure>
                <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000  group mb-20   ">
                  <div className="w-[100%] h-[100%] overflow-hidden group transition-all duration-1000 relative">
                    {' '}
                    <img
                      src={img3}
                      alt=""
                      className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
                    />
                  </div>
                  <div className="absolute uppercase text-white bg-color1 px-2 left-3 top-12 flex flex-col items-center ">
                    <p>Aug</p>
                    <p className="font-bold">02</p>
                  </div>
                  <figcaption onClick={() => notify()} className="hover:cursor-pointer absolute h-[150px] w-[85%]  bg-white bottom-[-80px]  left-[8%] flex flex-col justify-center px-5 group-hover:bottom-10 transition-all duration-1000 ">
                    <p className="uppercase text-color4 font-bold">Destinations</p>
                    <p className="capitalize text-color3 font-secondary text-xl text-center mt-4 font-semibold">
                      tips towards a flawless honeymoon{' '}
                    </p>
                  </figcaption>
                </figure>
              </div>
              <div className="flex flex-wrap justify-center xl:justify-between gap-10 px-6 xl:px-0 py-8 lg:px-3 ">
                <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000  group mb-20   ">
                  <div className="w-[100%] h-[100%] overflow-hidden group transition-all duration-1000 relative">
                    {' '}
                    <img
                      src={img}
                      alt=""
                      className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
                    />
                  </div>
                  <div className="absolute uppercase text-white bg-color1 px-2 left-3 top-12 flex flex-col items-center ">
                    <p>Aug</p>
                    <p className="font-bold">02</p>
                  </div>
                  <figcaption onClick={() => notify()} className="hover:cursor-pointer absolute h-[150px] w-[85%]  bg-white bottom-[-80px]  left-[8%] flex flex-col justify-center px-8 group-hover:bottom-10 transition-all duration-1000 ">
                    <p className="uppercase text-color4 font-bold">Tours</p>
                    <p className="capitalize text-color3 font-secondary text-xl text-center mt-4 font-semibold">
                      most popular yacht charter routes{' '}
                    </p>
                  </figcaption>
                </figure>
                <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000  group mb-20   ">
                  <div className="w-[100%] h-[100%] overflow-hidden group transition-all duration-1000 relative">
                    {' '}
                    <img
                      src={img2}
                      alt=""
                      className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
                    />
                  </div>
                  <div className="absolute uppercase text-white bg-color1 px-2 left-3 top-12 flex flex-col items-center ">
                    <p>Aug</p>
                    <p className="font-bold">07</p>
                  </div>
                  <figcaption onClick={() => notify()} className="hover:cursor-pointer absolute h-[150px] w-[85%]  bg-white bottom-[-80px]  left-[8%] flex flex-col justify-center px-3 group-hover:bottom-10 transition-all duration-1000 ">
                    <p className="uppercase text-color4 font-bold">travel</p>
                    <p className="capitalize text-color3 font-secondary text-xl text-center mt-4 font-semibold">
                      practical information for travelling to egypt
                    </p>
                  </figcaption>
                </figure>
                <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000  group mb-20   ">
                  <div className="w-[100%] h-[100%] overflow-hidden group transition-all duration-1000 relative">
                    {' '}
                    <img
                      src={img3}
                      alt=""
                      className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
                    />
                  </div>
                  <div className="absolute uppercase text-white bg-color1 px-2 left-3 top-12 flex flex-col items-center ">
                    <p>Aug</p>
                    <p className="font-bold">02</p>
                  </div>
                  <figcaption onClick={() => notify()} className="hover:cursor-pointer absolute h-[150px] w-[85%]  bg-white bottom-[-80px]  left-[8%] flex flex-col justify-center px-5 group-hover:bottom-10 transition-all duration-1000 ">
                    <p className="uppercase text-color4 font-bold">Destinations</p>
                    <p className="capitalize text-color3 font-secondary text-xl text-center mt-4 font-semibold">
                      tips towards a flawless honeymoon{' '}
                    </p>
                  </figcaption>
                </figure>
              </div>
              <div className="flex flex-wrap justify-center xl:justify-between gap-10 px-6 xl:px-0 py-8 lg:px-3 ">
                <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000  group mb-20   ">
                  <div className="w-[100%] h-[100%] overflow-hidden group transition-all duration-1000 relative">
                    {' '}
                    <img
                      src={img}
                      alt=""
                      className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
                    />
                  </div>
                  <div className="absolute uppercase text-white bg-color1 px-2 left-3 top-12 flex flex-col items-center ">
                    <p>Aug</p>
                    <p className="font-bold">02</p>
                  </div>
                  <figcaption onClick={() => notify()} className="hover:cursor-pointer absolute h-[150px] w-[85%]  bg-white bottom-[-80px]  left-[8%] flex flex-col justify-center px-8 group-hover:bottom-10 transition-all duration-1000 ">
                    <p className="uppercase text-color4 font-bold">Tours</p>
                    <p className="capitalize text-color3 font-secondary text-xl text-center mt-4 font-semibold">
                      most popular yacht charter routes{' '}
                    </p>
                  </figcaption>
                </figure>
                <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000  group mb-20   ">
                  <div className="w-[100%] h-[100%] overflow-hidden group transition-all duration-1000 relative">
                    {' '}
                    <img
                      src={img2}
                      alt=""
                      className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
                    />
                  </div>
                  <div className="absolute uppercase text-white bg-color1 px-2 left-3 top-12 flex flex-col items-center ">
                    <p>Aug</p>
                    <p className="font-bold">07</p>
                  </div>
                  <figcaption onClick={() => notify()} className="hover:cursor-pointer absolute h-[150px] w-[85%]  bg-white bottom-[-80px]  left-[8%] flex flex-col justify-center px-3 group-hover:bottom-10 transition-all duration-1000 ">
                    <p className="uppercase text-color4 font-bold">travel</p>
                    <p className="capitalize text-color3 font-secondary text-xl text-center mt-4 font-semibold">
                      practical information for travelling to egypt
                    </p>
                  </figcaption>
                </figure>
                <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000  group mb-20   ">
                  <div className="w-[100%] h-[100%] overflow-hidden group transition-all duration-1000 relative">
                    {' '}
                    <img
                      src={img3}
                      alt=""
                      className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"
                    />
                  </div>
                  <div className="absolute uppercase text-white bg-color1 px-2 left-3 top-12 flex flex-col items-center ">
                    <p>Aug</p>
                    <p className="font-bold">02</p>
                  </div>
                  <figcaption onClick={() => notify()} className="hover:cursor-pointer absolute h-[150px] w-[85%]  bg-white bottom-[-80px]  left-[8%] flex flex-col justify-center px-5 group-hover:bottom-10 transition-all duration-1000 ">
                    <p className="uppercase text-color4 font-bold">Destinations</p>
                    <p className="capitalize text-color3 font-secondary text-xl text-center mt-4 font-semibold">
                      tips towards a flawless honeymoon{' '}
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
