import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "./Cards";
import { fetchTopProducts } from "../../redux/productSlice";
import { Row, Col, Container } from "react-bootstrap";

const IMAGE_URL = import.meta.env.VITE_IMAGE_PATH;

const TopProduct = () => {
  const dispatch = useDispatch();
  const { topItems, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  if (loading) return null;
  if (!topItems || !topItems.length) return null;

  return (
    <Container className="product-container">
      <Row className="g-4">
        {(topItems || []).map((product) => (
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
              size={product.primary_size?.size}
              tags={product.tags}
              taxPercent={product.tax}
              taxTitle={product.tax_title}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TopProduct;
