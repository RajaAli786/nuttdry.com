import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchHeaderSettings } from '../../redux/headerSlice';
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore from "swiper";
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
SwiperCore.use([Autoplay]);

const TopMarquee = () => {
  const dispatch = useDispatch();
    const { data: headerData, loading } = useSelector(
      (state) => state.header
    );
  
    useEffect(() => {
      dispatch(fetchHeaderSettings());
    }, [dispatch]);
  
    if (loading || !headerData?.animated_title_1) return null;
  return (
    <>
    <div className="marquee-container py-3">
    <div className="marquee-wrapper">
        <div className="container">
        <Swiper
        loop={true}
        slidesPerView="auto"
        spaceBetween={50}
        speed={10000}               
        autoplay={{
          delay: 5000,               
          disableOnInteraction: false,
        }}
        freeMode={true}
        allowTouchMove={false}
      >
        {[...Array(5)].map((_, i) => (
          <SwiperSlide key={i} style={{ width: "auto" }}>
            <span
              dangerouslySetInnerHTML={{
                __html: headerData.animated_title_1,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
        </div>
      </div>
      </div>
    </>
  )
}
const MiddleMarquee = () => {
  const dispatch = useDispatch();
    const { data: headerData, loading } = useSelector(
      (state) => state.header
    );
  
    useEffect(() => {
      dispatch(fetchHeaderSettings());
    }, [dispatch]);
  
    if (loading || !headerData?.animated_title_2) return null;
  return (
    <>
    <div className="marquee-container py-3">
    <div className="marquee-wrapper">
        <div className="container">
        <Swiper
        loop={true}
        slidesPerView="auto"
        spaceBetween={50}
        speed={20000}               
        autoplay={{
          delay: 5000,               
          disableOnInteraction: false,
        }}
        freeMode={true}
        allowTouchMove={false}
      >
        {[...Array(5)].map((_, i) => (
          <SwiperSlide key={i} style={{ width: "auto" }}>
            <span
              dangerouslySetInnerHTML={{
                __html: headerData.animated_title_2,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
        </div>
      </div>
      </div>
    </>
  )
}

const BlankContainer = () => {
    return (
      <div className="container my-4">
        {/* This is a blank container for spacing */}
      </div>
    );
  }

// const MarqueeContainer = ({children}) => {
//     return (
//       <div className="marquee-container py-3">
//         {children}
//       </div>
//     );
//   };
  

export { TopMarquee, MiddleMarquee, BlankContainer }