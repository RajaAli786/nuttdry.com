import React from 'react';


const OfferBanner = () => {
  return (
    <div className="offer-banner position-relative text-center text-white">
      {/* Background Image */}
      <img
        src="images/background.jpg"
        alt="Special Offer"
        className="offer-banner-img w-100"
      />

      {/* Dark Overlay */}
      <div className="offer-banner-overlay position-absolute top-0 start-0 w-100 h-100"></div>

      {/* Text */}
      <div className="offer-banner-text position-absolute top-50 start-50 translate-middle">
        <p className="mb-0 fw-semibold fs-5">
          Special Offer: Get <strong>20% Off</strong> on Orders Over ₹1000!<br />
          Use Code: <strong>SAVE20</strong> at Checkout. Limited Time Only!
        </p>
      </div>
    </div>
  );
};

export default OfferBanner;
