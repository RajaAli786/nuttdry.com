import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SwiperCarosel from "./SwiperCarosel";
import Cards from "./Cards";
import { fetchFeaturedProducts } from "../../redux/productSlice";

const BASE_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_PATH;

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
        slug={product.slug}
        title={product.name}
        img={`${IMAGE_URL}/${product.primary_image?.image}`}
        price={product.primary_size?.price}
        old_price={product.primary_size?.old_price}
        tags={product.tags}
        button={[ { label: ( <> <i className="fa fa-cart-arrow-down me-2" /> Add to Cart </> ), color: "success", }, ]}
      />
    ),
  }));


  return <SwiperCarosel items={slides} />;
};

export default FeatureProduct;
