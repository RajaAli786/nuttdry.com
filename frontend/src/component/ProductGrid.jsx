// ProductGrid.jsx
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./common/Cards";
import { setPage } from "../redux/productSlice";

const BASE_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_PATH;

const ProductGrid = () => {
  const dispatch = useDispatch();
  const { items, loading, page, limit, total } = useSelector(
    (state) => state.products
  );

  const totalPages = Math.ceil(total / limit);

  if (loading) return <p className="text-center">Loading...</p>;

  if (!items.length)
    return <p className="text-center">No products found.</p>;

  return (
    <>
      <Row>
        {items.map((product) => (
          // console.log("Rendering product:", product),
          <Col key={product.id} md={4} className="mb-4">
            <Cards
              productId={product.id}
              slug={product.slug}
              title={product.name}
              img={`${IMAGE_URL}/${product.primary_image?.image}`}
              price={product.primary_size?.price}
              old_price={product.primary_size?.old_price}
              tags={product.tags}
              button={[
                {
                  label: (
                    <>
                      <i className="fa fa-cart-arrow-down me-2" />
                      Add to Cart
                    </>
                  ),
                  color: "success",
                },
              ]}
            />
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button
            variant="secondary"
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
          >
            Prev
          </Button>

          <span className="align-self-center">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="secondary"
            disabled={page === totalPages}
            onClick={() => dispatch(setPage(page + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
