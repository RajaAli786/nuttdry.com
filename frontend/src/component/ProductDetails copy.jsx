import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
// import { fetchProductByIdAPI } from "../api/products";
import { fetchProductById } from "../../redux/productSlice";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { IMAGE_URL } from "../config";
import Layout from "./common/Layout";
import CustomBreadcrumb from "./common/Breadcrumb";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/thumbs";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);

  /* =====================
      LOAD PRODUCT
  ===================== */
  useEffect(() => {
    loadProduct(id);
  }, [id]);
  
  const loadProduct = async (slug) => {
    setLoading(true);
    try {
      const res = await fetchProductByIdAPI(slug);
      const data = res?.data ?? res;

      setProduct(data);

      // Primary size default
      const primarySize =
        data.sizes?.find((s) => s.is_primary === 1) || data.sizes?.[0];

      if (primarySize) {
        setSelectedSize(primarySize);
        setPrice(primarySize.price);
        setOldPrice(primarySize.old_price);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  /* =====================
      SIZE CHANGE
  ===================== */
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setPrice(size.price);
    setOldPrice(size.old_price);
  };

  /* =====================
      DISCOUNT
  ===================== */
  let discountPercent = 0;
  if (oldPrice > price && oldPrice > 0) {
    discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  /* =====================
      CART
  ===================== */
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price,
        size: selectedSize?.size,
        img: product.primary_image?.image
          ? `${IMAGE_URL}/${product.primary_image.image}`
          : "",
        qty: 1,
      })
    );
    toast.success("Added to cart");
  };

  const handleCheckout = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  if (loading) return <h4 className="text-center py-4">Loading...</h4>;
  if (!product) return <h4 className="text-center py-4">Product not found</h4>;

  return (
    <Layout>
      <div className="container py-4">
        <CustomBreadcrumb productName={product.name} />
        <hr />

        <div className="row mt-4">
          {/* ================= IMAGE SWIPER ================= */}
          <div className="col-md-4">
            <Swiper
              modules={[Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              spaceBetween={10}
              className="mb-2"
            >
              {product.images?.map((img) => (
                <SwiperSlide key={img.id}>
                  <img
                    src={`${IMAGE_URL}/${img.image}`}
                    className="img-fluid border"
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnails */}
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Thumbs]}
              spaceBetween={10}
              slidesPerView={4}
            >
              {product.images?.map((img) => (
                <SwiperSlide key={img.id} className="img-thumbnail">
                  <img
                    src={`${IMAGE_URL}/${img.image}`}
                    className="img-fluid"
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ================= DETAILS ================= */}
          <div className="col-md-8">
            <h2>{product.name}</h2>
            <p>{product.short_description}</p>

            {/* PRICE */}
            <h4 className="fw-bold">₹ {price}</h4>

            {oldPrice && (
              <h6 className="text-muted text-decoration-line-through">
                ₹ {oldPrice}
              </h6>
            )}

            {discountPercent > 0 && (
              <p className="text-success">{discountPercent}% OFF</p>
            )}

            {/* ================= SIZE ================= */}
            <div className="mb-3">
              <strong>Size:</strong>
              <div className="d-flex gap-2 mt-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size.id}
                    className={`btn btn-sm ${
                      selectedSize?.id === size.id
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>
            

            {/* <Tabs className="mt-3">
              <Tab eventKey="details" title="Details">
                <p className="mt-3">{product.description}</p>
              </Tab>
              <Tab eventKey="info" title="Additional Info">
                <p className="mt-3">
                  <strong>SKU:</strong> {product.sku || "N/A"}
                </p>
              </Tab>
            </Tabs> */}

            <div className="d-flex gap-2 mt-4">
              <button className="btn btn-success" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn btn-primary" onClick={handleCheckout}>
                Checkout
              </button>
            </div>

            <p className="my-3"><strong>SKU:</strong> {product.sku || "N/A"}</p>
            <h6><b>About This Product</b></h6>
            <p className="mt-1">{product.description}</p>

          </div>
        </div>
        <hr />  
        <div className="row">
          <div className="col-md-6 mt-5">
          {product.images?.map((img) => (
                  <img
                  key={img.id}
                  src={`${IMAGE_URL}/${img.image}`}
                  className="img-fluid img-thumbnail mb-2"
                  alt=""
                />
            ))}
          </div>
        </div>

        <div className="row">
          <div className="releted-product text-center my-5">
            <h5>Releted Products</h5>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default ProductDetails;
