import React, {useEffect} from 'react';
import './Blog.scss';
import { BsArrowRightShort } from 'react-icons/bs';

import img from '../../images/image_travel(1).jpg';
import img2 from '../../images/image_travel(2).jpg';
import img3 from '../../images/image_travel(3).jpg';
import img4 from '../../images/image_travel(4).jpg';

import Aos from 'aos';
import 'aos/dist/aos.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Posts = [
  {
    id: 1,
    postImage: img,
    title: 'Beautiful Morocco, let us travel!',
    desc: 'The Kingdom of Morocco is a Muslim country in western North Africa, with coastlines on the Atlantic Ocean and Mediterranean Sea.',
  },
  {
    id: 2,
    postImage: img2,
    title: 'Beautiful Morocco, let us travel!',
    desc: 'The Kingdom of Morocco is a Muslim country in western North Africa, with coastlines on the Atlantic Ocean and Mediterranean Sea.',
  },
  {
    id: 3,
    postImage: img3,
    title: 'Beautiful Morocco, let us travel!',
    desc: 'The Kingdom of Morocco is a Muslim country in western North Africa, with coastlines on the Atlantic Ocean and Mediterranean Sea.',
  },
  {
    id: 4,
    postImage: img4,
    title: 'Beautiful Morocco, let us travel!',
    desc: 'The Kingdom of Morocco is a Muslim country in western North Africa, with coastlines on the Atlantic Ocean and Mediterranean Sea.',
  },
];

export default function Blog() {

  useEffect(()=> {
    Aos.init({duration:2000})
  }, [])

  const notify = () => toast("Feature being updated, please come back later!");

  return (
    <section className="blog container section">
      <div className="secContainer">
        <div className="secIntro">
            <h2 data-aos="fade-up" data-aos-duration="2000" className="secTitle font-bold text-xl">Our Best News?</h2>
            <p data-aos="fade-up" data-aos-duration="2500">An insight to the incredible experience in the world.</p>
        </div>

        <div className="mainContainer grid">
          {Posts.map(({id, postImage, title, desc}) => {
            return (
              <div data-aos="fade-up" data-aos-duration="2000" className="singlePost grid">
                <div className="imgDiv">
                  <img src={postImage} alt={title} />
                </div>

                <div className="postDetails">
                  <h3 data-aos="fade-up" data-aos-duration="3000" className="font-bold text-lg">{title}</h3>
                  <p data-aos="fade-up" data-aos-duration="4000">
                    {desc}
                  </p>
                  <a href="#" className="flex" data-aos="fade-up" data-aos-duration="4500" onClick={notify}>
                    Read more
                    <BsArrowRightShort className="icon"/>
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
