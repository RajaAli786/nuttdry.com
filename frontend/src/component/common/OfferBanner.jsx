import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchHeaderSettings } from '../../redux/headerSlice';
const IMAGE_URL = import.meta.env.VITE_IMAGE_PATH;
const OfferBanner = () => {
  const dispatch = useDispatch();
  const { data: headerData, loading } = useSelector(
    (state) => state.header
  );

  useEffect(() => {
    dispatch(fetchHeaderSettings());
  }, [dispatch]);

  if (loading || !headerData?.offer_title) return null;

  return (
    <div className="offer-banner position-relative text-center text-white">
      <img
        src={`${IMAGE_URL}/${headerData.offer_banner}`} alt="Special Offer" className="offer-banner-img w-100"
      />

      <div className="offer-banner-overlay position-absolute top-0 start-0 w-100 h-100"></div>

      <div className="offer-banner-text position-absolute top-50 start-50 translate-middle">
      <p
        className="mb-0 fw-semibold fs-5"
        dangerouslySetInnerHTML={{
          __html: headerData.offer_title,
        }}
      />
</div>
    </div>
  );
};

export default OfferBanner;
