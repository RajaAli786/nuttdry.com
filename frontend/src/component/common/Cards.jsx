import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const Cards = ({productId, slug, title, description, price, old_price, offer, button = null, img = null }) => {

  const dispatch = useDispatch();
  const offerValue = Number(offer) || 0;

  const oldPrice =
    old_price
      ? Number(old_price)
      : offerValue > 0
        ? Math.round(price / (1 - offerValue / 100))
        : null;

  return (
    <Container className=" d-flex justify-content-center">
      <Card style={{ width: '100%' }} className="shadow-sm">
        {offerValue >0 && (
          <div className="offer-badge position-absolute bg-danger text-white p-1 rounded-top-right" style={{ top: '10px', right: '10px', zIndex: 1 }}>
            {offerValue}% OFF
          </div>)}
        <Card.Body className="pb-3 text-center">
        <Link to={`/product/${slug}`} className="text-decoration-none text-dark">
            {img && (
              <div className="card-img overflow-hidden">
                <Card.Img
                  variant="top"
                  src={img}
                  alt={title || 'Product Image'}
                  className="img-fluid"
                />
              </div>
            )}

            {title && <Card.Title className="my-3">{title}</Card.Title>}
          </Link>

          {description && <Card.Text>{description}</Card.Text>}

         {price && (<hr style={{ opacity: 0.1 }} />)}
         
          {(price || button) && (
            
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3">
               
              {/* Price */}
              {price && (
                <span className="fw-bold fs-6 mb-0">
                  ₹{price}
                  &nbsp;
                  
                  {oldPrice && (
                    <small className="fw-bold text-muted text-decoration-line-through  mb-0" style={{ fontSize: '0.8rem' }}>
                      ₹{oldPrice}
                    </small>
                  )}
                </span>
              )}
              
            
              {/* Buttons */}
              {button && (
                Array.isArray(button) ? (
                  button.map((btn, index) => {
                    if (typeof btn === 'object') {
                      return (
                        <Button
                          key={index}
                          variant={btn.color || 'primary'}
                          className="mx-1 "
                          onClick={() => {
                            dispatch(
                              addToCart({
                                id: productId, 
                                name: title,
                                price: price,
                                img: img,
                                discount: Number(offer || 0)
                              })
                            );
    
                            toast.success(`${title} added to cart!`);
                          }}
                        >
                          {btn.label}
                        </Button>
                      );
                    }

                    return (
                      <Button
                        key={index}
                        variant="primary"
                        className="mx-1"
                      >
                        {btn}
                      </Button>
                    );
                  })
                ) : (
                  <Button variant="primary">{button}</Button>
                )
              )}

            </div>
            )}

        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cards;
