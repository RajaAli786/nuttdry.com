import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import { fetchProductByIdAPI } from "../api/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { BASE_URL } from "../config";
import Layout from "./common/Layout";
import "../assets/css/ProductDetails.scss";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState("details");

  useEffect(() => {
    loadProduct(id);
  }, [id]);

  const loadProduct = async (productId) => {
    setLoading(true);
    try {
      const res = await fetchProductByIdAPI(productId);
      setProduct(res?.data ?? res);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  /* ======================
      PRICE LOGIC
  ====================== */
  const price = Number(product?.price || 0);
  const discount = Number(product?.discount || 0);

  const oldPrice =
    product?.old_price
      ? Number(product.old_price)
      : discount > 0
        ? Math.round(price / (1 - discount / 100))
        : null;

  /* ======================
      CART ACTIONS
  ====================== */
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: price,
        img: product.image ? `${BASE_URL}/${product.image}` : "",
        discount: discount,
        qty: 1,
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  const handleCheckout = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  if (loading) return <h3 className="text-center py-4">Loading...</h3>;
  if (!product) return <h4 className="text-center py-4">No Product Found!</h4>;

  return (
    <Layout>
      <div className="container py-4 product-details mb-5">

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/products">Products</Link>
            </li>
            <li className="breadcrumb-item active">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="row">

          {/* Image */}
          <div className="col-md-4 text-center">
            <img
              src={
                product.image
                  ? `${BASE_URL}/${product.image}`
                  : "/images/no-image.png"
              }
              alt={product.name}
              className="img-fluid mb-3 product-img"
            />
          </div>

          {/* Details */}
          <div className="col-md-6">
            <h2 className="fw-bold">{product.name}</h2>

            <p className="product-description">
              {product.short_description || product.description}
            </p>

            {/* PRICE */}
            <h4 className="fw-bold text-primary mb-1">
              ₹ {price}
            </h4>

            {/* OLD PRICE */}
            {oldPrice && (
              <h6 className="fw-bold text-muted text-decoration-line-through mb-1">
                ₹ {oldPrice}
              </h6>
            )}

            {/* DISCOUNT */}
            {discount > 0 && (
              <p className="text-success mb-3">
                {discount}% OFF
              </p>
            )}

            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mt-4">
              <Tab eventKey="details" title="Product Details">
                <div className="mt-3">
                  <p>{product.description}</p>
                </div>
              </Tab>

              <Tab eventKey="additional" title="Additional Info">
                <div className="mt-3">
                  <p>
                    <strong>SKU:</strong> {product.sku || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {product.status ? "Available" : "Out of stock"}
                  </p>
                </div>
              </Tab>
            </Tabs>

            <div className="d-flex gap-2 mt-3">
              <button
                className="btn btn-success btn-sm flex-grow-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                className="btn btn-primary btn-sm flex-grow-1"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
