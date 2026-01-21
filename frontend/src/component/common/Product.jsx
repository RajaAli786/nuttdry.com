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
    <Container className="mt-5 mb-5 product-container">
      <Row className="text-center">
        <h3>{title}</h3>
        <a href={link}>VIEW ALL</a>
      </Row>
    </Container>
  );
};
export { ProductHeader };

