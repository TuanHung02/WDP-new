import React, {useEffect} from 'react'
import './About.scss'

import img from '../../images/image_customer.png'
import img2 from '../../images/image_feature.png'
import img3 from '../../images/image_protect.png'

import video from '../../images/video.mp4'


import Aos from 'aos';
import 'aos/dist/aos.css'

export default function About() {

  useEffect(()=> {
    Aos.init({duration:2000})
  }, [])

  return (
    <section className='about section'>
      <div className="secContainer">
        <div className="title">
            Why Choose Us?
        </div>

        <div className="mainContent container grid">
          <div data-aos="fade-up" data-aos-duration="2000" className="singleItem">
            <div className='img_div'>
              <img src={img3} alt="Image name" />
            </div>

            <h2 className='font-bold'>Best Price Guarantee</h2>

            <p>
            Research shows that a chance to break away from the normal rhythms of
            daily life reduces stress and improves health and well-being.
            </p>

          </div>
          
          <div data-aos="fade-up" data-aos-duration="2500" className="singleItem">
            <div className='img_div'>
              <img src={img2} alt="Image name" />
            </div>

            <h3>Easy & Quick Booking</h3>

            <p>
            Research shows that a chance to break away from the normal rhythms of
            daily life reduces stress and improves health and well-being.
            </p>

          </div>

          <div data-aos="fade-up" data-aos-duration="3000" className="singleItem">
            <div className='img_div'>
              <img src={img} alt="Image name" />
            </div>

            <h3>Customer Care 24/7</h3>

            <p>
            Research shows that a chance to break away from the normal rhythms of
            daily life reduces stress and improves health and well-being.
            </p>

          </div>

        </div>

        <div className="videoCard container">
          <div className="cardContent grid">

            <div data-aos="fade-right" data-aos-duration="2000" className="cardText">
              <h2>
               Wonderful House experience nin there!
              </h2>
              <p>
                The Adventure subranking is based on an
                equally weighted average of scores from
                five country.
              </p>
            </div>

            <div data-aos="fade-left" data-aos-duration="2000" className="cardVideo">
              <video src={video} autoPlay loop muted type='video/mp4'></video>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
