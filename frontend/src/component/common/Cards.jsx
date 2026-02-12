import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

import "../../assets/css/card.scss";
const Cards = ({
  productId,
  slug,
  title,
  description,
  price,
  old_price,
  tags,          // eg: "SELLING FAST"
  img,
}) => {
  const dispatch = useDispatch();

  const originalPrice = Number(old_price) || 0;
  const finalPrice = Number(price) || 0;

  let discountPercent = 0;
  if (originalPrice > finalPrice && originalPrice > 0) {
    discountPercent = Math.round(
      ((originalPrice - finalPrice) / originalPrice) * 100
    );
  }

  return (
    <Container className="d-flex justify-content-center p-0">
      <Card className="product-card shadow-sm position-relative">

        {/* OFFER BADGE */}
        {tags && tags!=0 && (
          <span className="selling-fast">
            {tags}
          </span>
        )}

        {/* IMAGE */}
        <Link to={`/product/${slug}`} className="text-decoration-none">
          <div className="product-img">
            <Card.Img src={img} alt={title} />
          </div>
        </Link>

        <Card.Body className="text-center">

          {/* TITLE */}
          <Link to={`/product/${slug}`} className="text-decoration-none text-dark">
            <Card.Title className="product-title" style={{cursor:'pointer'}} title={title || ""}>
              {title}
            </Card.Title>
          </Link>

          {/* DESCRIPTION */}
          {description && (
            <p className="product-desc">{description}</p>
          )}

          {/* SIZE */}
          {/* <div className="product-size">100ml</div> */}

          {/* RATING */}
          {/* <div className="rating">
            ⭐ <strong>5.0</strong>
            <span className="reviews">✔ 164 Reviews</span>
          </div> */}

          {/* PRICE */}
          <div className="price-box">
            <span className="final-price">₹{finalPrice}</span>

            {originalPrice > 0 && (
              <>
                <span className="old-price">₹{originalPrice}</span>

                {discountPercent > 0 && (
                  <span className="discount">
                    {discountPercent}% off
                  </span>
                )}
              </>
            )}
          </div>

          {/* ADD TO CART */}
          <Button
            variant="success"
            className="add-to-cart-btn text-white w-100 mt-3"
            onClick={() => {
              dispatch(
                addToCart({
                  id: productId,
                  name: title,
                  price: finalPrice,
                  img: img,
                  discount: discountPercent,
                })
              );
              toast.success(`${title} added to cart!`);
            }}
          >
            ADD TO CART
          </Button>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cards;
