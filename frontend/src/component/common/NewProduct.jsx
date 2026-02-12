import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SwiperCarosel from "./SwiperCarosel";
import Cards from "./Cards";
import { fetchNewProducts } from "../../redux/productSlice";
import { Row, Col, Container } from "react-bootstrap";

const BASE_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_PATH;

const NewProduct = () => {
  const dispatch = useDispatch();
  const { newItems, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchNewProducts());
  }, [dispatch]);

  if (loading) return null;

  const slides = (
  <Container className="product-container">
  <Row className="g-4">
    {(newItems || []).map((product) => (
      <Col
        key={product.id}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className="d-flex"
      >
        <Cards
          productId={product.id}
          slug={product.slug}
          title={product.name}
          img={`${IMAGE_URL}/${product.primary_image?.image}`}
          price={product.primary_size?.price}
          old_price={product.primary_size?.old_price}
          tags={product.tags}
        />
      </Col>
    ))}
  </Row>
  </Container>
  );
  return slides;
};

export default NewProduct;
