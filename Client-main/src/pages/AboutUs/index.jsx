import React, { useState, useEffect } from 'react';
import './aboutUs.scss';
import { Navbar, NavbarLogin, Footer } from '@/layout';
import img from '../../images/about.jpeg';
import Aos from 'aos';

import { jwtDecode } from 'jwt-decode';
import NavbarPartnerLogin from '../../layout/NavbarPartnerLogin/index.jsx';
import axios from 'axios';

export default function index() {
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
      <section className="w-full bg-boat bg-cover bg-bottom bg-no-repeat h-[50vh] flex justify-center bg-color2 bg-blend-multiply bg-opacity-50">
        <div className="w-full container flex justify-center items-center flex-col">
          <p className="text-white font-secondary text-3xl 2xl:text-6xl">
            About Us
          </p>
          {/* <div classNameName="flex mt-5 gap-5">
                <div classNameName="flex items-center"><i classNameName="bi bi-geo-alt text-white text-2xl me-2"></i><p classNameName="text-white">Maldives</p></div>
                <div classNameName="flex items-center"><i classNameName="bi bi-clock text-white text-2xl me-2"></i><p classNameName="text-white"> 4 Days + 3 Nights   </p></div>
        </div> */}
        </div>
      </section>

      <section className="w-full flex justify-center bg-blue-50 dark:bg-slate-800  h-auto">
        <div className="w-full flex justify-between flex-wrap px-0 2xl:px-36 h-auto py-16  mb-6 mt-[5rem]">
          <div className="w-full lg:w-[50%]  bg-color px-5 ">
            <p className="text-color4 uppercase">The best travel agency</p>
            <p className="text-color3 text-5xl font-bold uppercase font-secondary my-4">
              Discover the <span className="text-color1"> world</span> with our
              guide
            </p>
            <p className="text-color6">
              You can choose any country with good tourism. Agency elementum
              sesue the aucan vestibulum aliquam justo in sapien rutrum
              volutpat. Donec in quis the pellentesque velit. Donec id velit ac
              arcu posuere blane.
            </p>
            <p className="text-color6 my-4">
              Hotel ut nisl quam nestibulum ac quam nec odio elementum ceisue
              the miss varius natoque penatibus et magnis dis parturient monte.
            </p>
            <div className="flex items-center">
              {' '}
              <i className="bi bi-check text-white bg-color4  rounded-[50%] px-2 py-1 me-3"></i>{' '}
              <p className="text-color6">20 Years of Experience</p>
            </div>
            <div className="flex items-center my-4">
              {' '}
              <i className="bi bi-check text-white bg-color4  rounded-[50%] px-2 py-1 me-3"></i>{' '}
              <p className="text-color6">150+ Tour Destinations</p>
            </div>
            <div className="flex items-center">
              <i className="bi bi-telephone-forward text-color1 text-2xl me-3"></i>
              <div>
                <p className="text-color6 ">For information</p>
                <p className="text-color6 text-2xl">09188085590</p>
              </div>
            </div>
          </div>
          <div className=" w-full lg:w-[50%]   flex flex-col justify-center items-center bg-color5 h-auto pb-8 lg:pb-0 mt-10 lg:mt-0 ">
            <figure className="w-[70%] h-[500px] relative">
              <div className="w-[100%] h-[100%] bg-color4 absolute left-8 top-8"></div>
              <img
                src={img}
                alt=""
                className="w-[100%] h-[100%] absolute z-10 object-cover hover:scale-[.95] transition-all duration-500"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 dark:bg-slate-800" id="contact">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-4">
            <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
              <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                Contact
              </p>
              <h2
                className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">In hac habitasse platea
                dictumst
              </p>
            </div>
          </div>
          <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2">
              <div className="h-full pr-6">
                <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
                  className aptent taciti sociosqu ad
                  litora torquent per conubia nostra, per inceptos himenaeos. Duis nec ipsum orci. Ut scelerisque
                  sagittis ante, ac tincidunt sem venenatis ut.
                </p>
                <ul className="mb-6 md:mb-0">
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" className="h-6 w-6">
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                        <path
                          d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z">
                        </path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Our Address
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">1230 Maecenas Street Donec Road</p>
                      <p className="text-gray-600 dark:text-slate-400">New York, EEUU</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" className="h-6 w-6">
                        <path
                          d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
                        </path>
                        <path d="M15 7a2 2 0 0 1 2 2"></path>
                        <path d="M15 3a6 6 0 0 1 6 6"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Contact
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">Mobile: +1 (123) 456-7890</p>
                      <p className="text-gray-600 dark:text-slate-400">Mail: tailnext@gmail.com</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" className="h-6 w-6">
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                        <path d="M12 7v5l3 3"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Working
                        hours</h3>
                      <p className="text-gray-600 dark:text-slate-400">Monday - Friday: 08:00 - 17:00</p>
                      <p className="text-gray-600 dark:text-slate-400">Saturday &amp; Sunday: 08:00 - 12:00</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                <h2 className="mb-4 text-2xl font-bold">Ready to Get Started?</h2>
                <form id="contactForm">
                  <div className="mb-6">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label for="name" className="pb-1 text-xs uppercase tracking-wider"></label><input type="text" id="name" autocomplete="given-name" placeholder="Your name" className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" name="name" />
                      </div>
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label for="email" className="pb-1 text-xs uppercase tracking-wider"></label><input type="email" id="email" autocomplete="email" placeholder="Your email address" className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" name="email" />
                      </div>
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label for="textarea" className="pb-1 text-xs uppercase tracking-wider"></label><textarea id="textarea" name="textarea" cols="30" rows="5" placeholder="Write your message..." className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"></textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
