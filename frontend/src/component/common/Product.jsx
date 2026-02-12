import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SwiperCarosel from "./SwiperCarosel";
import Cards from "./Cards";
import { BASE_URL } from "../../config";
import {
  fetchTopProducts,
  fetchFeaturedProducts,
} from "../../redux/productSlice";

/* =========================
   SECTION HEADER
========================= */
const ProductHeader = ({ title, link }) => {
  return (
    <Container className="product-container" style={{ marginTop: '5em' }}>
      <Row className="text-left justify-content-between align-items-center mb-4">
        <div className="col-lg-10">
          <h4><strong>{title}</strong></h4>
          {/* <p>Explore best-selling safe, natural, and 100% toxin-free baby and beauty products from Mamaearth. Get amazing deals and start your toxin-free skin, hair, and baby care journey.</p> */}
        </div>
        <div className="col-lg-2 text-lg-end text-start">
          <a href={link} className="btn btn-success text-white py-2 text-decoration-none" style={{ borderRadius: '4px' }}>VIEW ALL</a>
        </div>
      </Row>
    </Container>
  );
};
export { ProductHeader };

