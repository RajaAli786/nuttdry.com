import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination, Autoplay, Navigation} from 'swiper/modules';
import { Container } from 'react-bootstrap';

const SwiperCarosel = ({ items }) => {
console.log(items);
  return (
    <>
      <Container>
      <Swiper
      slidesPerView={4}
      spaceBetween={30}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      modules={[Autoplay, Navigation]}
      navigation={false}
      className="mySwiperProduct"
      loop={true} 
      grabCursor={true} 
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
    >
      
      {items.map((slide) => (
          <SwiperSlide key={slide.id}>
            {slide.content}
          </SwiperSlide>
        ))}

    </Swiper>
      </Container>
    </>
  )
}

export default SwiperCarosel