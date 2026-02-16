import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchProductById, fetchRelatedProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import { IMAGE_URL } from "../config";
import Layout from "./common/Layout";
import CustomBreadcrumb from "./common/Breadcrumb";
import RelatedProducts from "./RelatedProducts";
import { splitTax } from "../utils/priceUtils";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/thumbs";
import "../assets/css/ProductDetails.scss";
import SEO from "./common/SEO";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productDetails, relatedItems, loading } = useSelector(
    (state) => state.products
  );

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    phone: "",
    rating: 0,
    comment: "",
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, rating, comment } = newReview;

    if (!name.trim()) return toast.error("Please enter your name");
    if (!email.trim()) return toast.error("Please enter your email");
    if (!phone.trim()) return toast.error("Please enter your phone number");

    if (!/^\S+@\S+\.\S+$/.test(email))
      return toast.error("Invalid email format");

    if (!/^[0-9]{10}$/.test(phone))
      return toast.error("Phone must be 10 digits");

    if (rating === 0)
      return toast.error("Please select rating");

    if (!comment.trim())
      return toast.error("Please write a review");

    const reviewObj = {
      id: Date.now(),
      name,
      email,
      phone,
      rating,
      comment,
    };

    setReviews([reviewObj, ...reviews]);

    setNewReview({
      name: "",
      email: "",
      phone: "",
      rating: 0,
      comment: "",
    });

    toast.success("Review submitted successfully");
  };


  /* ================= FETCH ================= */
  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (productDetails?.category_id) {
      dispatch(fetchRelatedProducts(productDetails.category_id));
    }
  }, [productDetails, dispatch]);

  /* ================= PRIMARY SIZE ================= */
  useEffect(() => {
    if (productDetails?.sizes?.length) {
      const primary =
        productDetails.sizes.find((s) => Number(s.is_primary) === 1) ||
        productDetails.sizes[0];
      setSelectedSize(primary);
      setQuantity(1);
    }
  }, [productDetails]);

  const product = productDetails;

  /* ================= PRICE CALCULATION ================= */

  const rating = Number(product?.rating || 0);

  const unitPrice = Number(selectedSize?.price || 0);
  const oldUnitPrice = Number(selectedSize?.old_price || 0);

  const totalPrice = unitPrice * quantity;
  const totalOldPrice = oldUnitPrice * quantity;

  /* ===== TAX ===== */
  const taxPercent = Number(product?.tax || 0);
  // agar size level pe hai to:
  // const taxPercent = Number(selectedSize?.tax || 0); 

  const { baseAmount, taxAmount, total } =
  splitTax(totalPrice, taxPercent);

  const finalAmount = total;

  /* ===== DISCOUNT ===== */
  const discountPercent =
    oldUnitPrice > unitPrice
      ? Math.floor(((oldUnitPrice - unitPrice) / oldUnitPrice) * 100)
      : 0;

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) =>
      star <= Math.round(rating) ? "★" : "☆"
    );
  };
  /* ================= CART ================= */
  const handleAddToCart = () => {
    if (!selectedSize) return toast.error("Please select size");

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: unitPrice,   
        taxPercent: taxPercent,
        taxTitle: product.tax_title,
        size: selectedSize.size,
        discount:discountPercent,
        qty: quantity,
        img: product.primary_image?.image
          ? `${IMAGE_URL}/${product.primary_image.image}`
          : "",
      })
    );

    toast.success("Added to cart");
  };

  const handleCheckout = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  if (loading)
    return <h4 className="text-center py-5">Loading Product...</h4>;

  if (!product)
    return <h4 className="text-center py-5">Product not found</h4>;

  return (
    <Layout>
      <SEO
        title={product?.meta_title}
        description={product?.meta_description}
        keywords={product?.meta_keywords}
        favicon={
          product?.favicon
            ? `${import.meta.env.VITE_IMAGE_PATH}${product.favicon}`
            : "/favicon.ico"
        }
      />
      <div className="container product-details py-4">

        <CustomBreadcrumb productName={product.name} />
        <hr />

        <div className="row mt-4">

          {/* ================= IMAGE SECTION ================= */}
          <div className="col-md-4 shadow-sm rounded" style={{}}>

            <Swiper
              modules={[Thumbs]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed
                    ? thumbsSwiper
                    : null,
              }}
              spaceBetween={10}
            >
              {product.images?.map((img) => (
                <SwiperSlide key={img.id}>
                  <img
                    src={`${IMAGE_URL}/${img.image}`}
                    className="img-fluid border-bottom"
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Thumbs]}
              spaceBetween={10}
              slidesPerView={4}
              className="mt-3"
            >
              {product.images?.map((img) => (
                <SwiperSlide key={img.id}>
                  <img
                    src={`${IMAGE_URL}/${img.image}`}
                    className="img-fluid img-thumbnail"
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>

          </div>

          {/* ================= DETAILS SECTION ================= */}
          <div className="col-md-8" style={{ padding: '0 60px' }}>

            <h3 className="fw-bold">{product.name}</h3>

            <div className="mb-2 text-warning">
              {rating > 0 && renderStars(rating).join(" ")}
              <span className="text-muted ms-2">
                ({rating.toFixed(1)})
              </span>
            </div>

            <p className="text-muted">{product.short_description}</p>

            {/* PRICE */}
            <div className="my-3">

              {/* FINAL AMOUNT */}
              <h3 className="text-success fw-bold">
                ₹ {baseAmount.toFixed(2)}
              </h3>

              {/* Subtotal */}
              <div className="text-muted small">
                Subtotal: ₹ {finalAmount.toFixed(2)}
              </div>

              {/* Tax */}
              {taxPercent > 0 && (
                <div className="text-muted small fw-bold">
                  {product.tax_title} ({taxPercent}%): ₹ {taxAmount.toFixed(2)}
                </div>
              )}
              {/* Old Price */}
              {oldUnitPrice > unitPrice && (
                <div className="text-muted text-decoration-line-through">
                  ₹ {totalOldPrice.toFixed(2)}
                </div>
              )}

              {/* Discount Badge */}
              {discountPercent > 0 && (
                <span className="badge bg-danger ms-2">
                  {discountPercent}% OFF
                </span>
              )}

              {/* Quantity Info */}
              {quantity > 1 && (
                <div className="text-muted small mt-1">
                  ₹ {unitPrice} × {quantity}
                </div>
              )}

            </div>

            {/* SIZE SELECTOR */}
            <div className="mb-4">
              <strong className="d-block mb-2">Select Size:</strong>

              <div className="d-flex gap-3 flex-wrap">
                {product.sizes?.map((size) => {
                  const isActive = selectedSize?.id === size.id;

                  return (
                    <div
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`size-box ${selectedSize?.id === size.id ? "size-active" : ""}`}
                    >
                      {size.size}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mb-4">
              <strong className="d-block mb-2">Quantity:</strong>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <button
                  className="btn"
                  style={{ borderRight: "1px solid #ddd" }}
                  onClick={() =>
                    setQuantity((q) => (q > 1 ? q - 1 : 1))
                  }
                >
                  −
                </button>

                <div style={{ padding: "0 20px", fontWeight: 600 }}>
                  {quantity}
                </div>

                <button
                  className="btn"
                  style={{ borderLeft: "1px solid #ddd" }}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="d-flex gap-3">
              <button
                className="btn btn-success px-4"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                className="btn btn-primary px-4"
                onClick={handleCheckout}
              >
                Buy Now
              </button>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-4">
              <h5>About This Product</h5>
              <p>{product.description}</p>
            </div>

          </div>
        </div>


        {/* ================= RELATED PRODUCTS ================= */}
        <div className="mt-5">
          <h4 className="mb-4 fw-bold">Related Products</h4>
          <RelatedProducts currentProductId={product.id} />
          {/* <div className="row">
            {relatedItems?.length === 0 ? (
              <p className="text-muted">No related products found.</p>
            ) : (
              relatedItems
                .filter((item) => item.id !== product.id)
                .map((item) => (
                  <div className="col-md-3 col-6 mb-4" key={item.id}>
                    <div
                      className="card h-100 shadow-sm border-0 related-card"
                      onClick={() => navigate(`/product/${item.slug}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={`${IMAGE_URL}/${item.primary_image?.image}`}
                        className="card-img-top p-3"
                        style={{
                          height: "180px",
                          objectFit: "contain",
                        }}
                        alt=""
                      />

                      <div className="card-body text-center">
                        <h6 className="text-truncate">
                          {item.name}
                        </h6>

                        <div className="fw-bold text-success">
                          ₹ {item.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div> */}
        </div>


        {/* ================= REVIEW SECTION ================= */}
        {/* <div className="review-section mt-5">
          <h4 className="mb-4 fw-bold">Customer Reviews</h4>

          <div className="review-form-card">
            <form onSubmit={handleReviewSubmit}>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Your Name</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({ ...newReview, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={newReview.email}
                    onChange={(e) =>
                      setNewReview({ ...newReview, email: e.target.value })
                    }
                    placeholder="Enter your email"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={newReview.phone}
                    onChange={(e) =>
                      setNewReview({ ...newReview, phone: e.target.value })
                    }
                    placeholder="10 digit phone number"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Your Rating</label>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() =>
                          setNewReview({ ...newReview, rating: star })
                        }
                        className={
                          star <= newReview.rating ? "star active" : "star"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <label>Your Review</label>
                  <textarea
                    rows="4"
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        comment: e.target.value,
                      })
                    }
                    placeholder="Share your experience about this product..."
                  />
                </div>
              </div>

              <button type="submit" className="submit-review-btn">
                Submit Review
              </button>
            </form>
          </div>
        </div> */}




      </div>


    </Layout>
  );
}

export default ProductDetails;
