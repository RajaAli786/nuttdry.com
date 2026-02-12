import React, {useEffect, useState} from "react";
import {Container, Row } from 'react-bootstrap'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Zoom } from 'swiper/modules';

import api from "../api/http";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BASE_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_PATH;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api.get("/testimonials")
      .then((res) => {
        setTestimonials(res.data.data || []);
      })
      .catch((err) => {
        console.error("Failed to load testimonials", err);
      });
  }, []);
// console.log("setTestimonials:- ", testimonials);
// if (!testimonials || testimonials.length === 0) return null;

  return (
    <main className="slide-row testimonial-section mt-5">
      <Container className='mt-5 mb-3 product-container'>
          <Row className='text-center'>
              <h3>Testimonials</h3>
          </Row>
        </Container>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={3}
        autoplay={{ delay: 5000 }}
        loop={testimonials.length >= 3}
        // speed={600}
        spaceBetween={30}
        pagination={{
          clickable: true,
          enabled: false // Disable pagination by default
        }}
        className="slider"
        breakpoints={{
          0: {
            slidesPerView: 1, // mobile
            pagination: {
              enabled: false // mobile
            }
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2, // tablet
          },
          1024: {
            slidesPerView: 3, // desktop
            pagination: {
              enabled: true // desktop
            }
          },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide className="" key={index}>
            <div className="slide-col">
              <div className="content">
                <p style={{height:'200px'}}>{item.message}</p>
                <h2>{item.name}</h2>
                <p>{item.designation}</p>

                <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= item.rating ? "star active" : "star"}
                  >
                    ★
                  </span>
                ))}
              </div>

              </div>
              <div className="hero">
                <img src={`${IMAGE_URL}/${item.image}`} alt={item.name} />
              </div>
            </div> 
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default Testimonials;
