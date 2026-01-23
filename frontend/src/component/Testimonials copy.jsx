import React, { useEffect, useState } from "react";
import { Container, Row } from 'react-bootstrap'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Zoom } from 'swiper/modules';

import api from "../api/http";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BASE_URL = import.meta.env.VITE_API_URL;

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
  return (
    <main className="slide-row testimonial-section">
      <Container className='mt-5 mb-3 product-container'>
        <Row className='text-center'>
          <h3>Testimonials</h3>
        </Row>
      </Container>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        // autoplay={{ delay: 4000 }}
        loop={true}
        speed={600}
        spaceBetween={30}

        className="slider"
        breakpoints={{
          0: {
            slidesPerView: 1, // mobile
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2, // tablet
          },
          1024: {
            slidesPerView: 3, // desktop
          },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <div className="content">
                <p className="message">"{item.message}"</p>
                <h5 className="name">{item.name}</h5>
                <small className="designation">{item.designation}</small>
              </div>

              <div className="hero">
                <img
                  src={`${BASE_URL}/${item.image}`}
                  alt={item.name}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default Testimonials;
