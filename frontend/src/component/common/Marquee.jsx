import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchHeaderSettings } from '../../redux/headerSlice';

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
    <div className="marquee">
        <span
          className="mb-0  fs-7"
          dangerouslySetInnerHTML={{
            __html: headerData.animated_title_1,
          }}
        />
        
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
    <div className="marquee">
      <span
          className="mb-0  fs-7"
          dangerouslySetInnerHTML={{
            __html: headerData.animated_title_2,
          }}
        />
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

const MarqueeContainer = ({children}) => {
    return (
      <div className="marquee-container py-3">
        {children}
      </div>
    );
  };
  

export { TopMarquee, MiddleMarquee, MarqueeContainer, BlankContainer }