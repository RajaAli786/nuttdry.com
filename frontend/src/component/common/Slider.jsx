import React, { use, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Zoom } from 'swiper/modules';
import { useSelector, useDispatch } from "react-redux";

import { fetchSliders, selectSliders } from '../../redux/sliderSlice';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const BASE_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_PATH;


const SuperFlowSwiper = () => {
  const dispatch = useDispatch();

  const sliders = useSelector(selectSliders);

  useEffect(() => {
    dispatch(fetchSliders());
  }, [dispatch]);

  // console.log("Sliders from store:", sliders);
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, Zoom]}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop={true}
      zoom={true}
      className="mySwiper"
      breakpoints={{
        0: {
          pagination: {
            enabled: false // mobile
          },
          navigation:{
            enabled: false
          }
        },
        640: {
          pagination: {
            enabled: false // mobile
          },
          navigation:{
            enabled: false
          }
        },
        768: {
          pagination: {
            enabled: false // mobile
          },
          navigation:{
            enabled: false
          }
        },
        1024: {
          pagination: {
            enabled: true // desktop
          },
          navigation:{
            enabled: true
          }
        },
      }}
    >
      {sliders.map(({ image, title, subtitle }, index) => (
        <SwiperSlide key={index} style={{ position: 'relative' }}>
          <div className="zoom-slide-wrapper">
            <img
              src={`${IMAGE_URL}/${image}`}
              alt={title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '60px',
              left: '50px',
              color: 'white',
              textShadow: '0 2px 10px rgba(0,0,0,0.7)',
              maxWidth: '50%',
            }}
          >

            <h2 style={{ fontWeight: '700', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {title}
            </h2>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.4' }}>{subtitle}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SuperFlowSwiper;
