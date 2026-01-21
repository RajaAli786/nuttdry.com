import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SwiperCarosel from "./SwiperCarosel";
import Cards from "./Cards";
import { fetchTopProducts } from "../../redux/productSlice";

const BASE_URL = import.meta.env.VITE_API_URL;

const TopProduct = () => {
  const dispatch = useDispatch();
  const { topItems, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  if (loading) return null;

  const slides = (topItems || []).map((product) => ({
    id: product.id,
    content: (
      <Cards
        productId={product.id}
        title={product.name}
        img={`${BASE_URL}/${product.image}`}
        price={product.price}
        offer={product.discount}
      />
    ),
  }));


  return <SwiperCarosel items={slides} />;
};

export default TopProduct;
