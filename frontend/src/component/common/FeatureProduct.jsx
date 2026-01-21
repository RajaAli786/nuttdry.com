import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SwiperCarosel from "./SwiperCarosel";
import Cards from "./Cards";
import { fetchFeaturedProducts } from "../../redux/productSlice";

const BASE_URL = import.meta.env.VITE_API_URL;

const FeatureProduct = () => {
  const dispatch = useDispatch();
  const { featuredItems, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  if (loading) return null;

  const slides = (featuredItems || []).map((product) => ({
    id: product.id,
    content: (
      <Cards
        productId={product.id}
        title={product.name}
        img={`${BASE_URL}/${product.image}`}
        price={product.price}
        offer={product.discount}
        button={[ { label: ( <> <i className="fa fa-cart-arrow-down me-2" /> Add to Cart </> ), color: "success", }, ]}
      />
    ),
  }));


  return <SwiperCarosel items={slides} />;
};

export default FeatureProduct;
