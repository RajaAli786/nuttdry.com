import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SwiperCarosel from "./SwiperCarosel";
import Cards from "./Cards";
import { fetchTopProducts } from "../../redux/productSlice";


const BASE_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_PATH;

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
        slug={product.slug}
        title={product.name}
        img={`${IMAGE_URL}/${product.primary_image?.image}`}
        price={product.primary_size?.price}
        old_price={product.primary_size?.old_price}
        tags={product.tags}
      />
    ),
    
  }));


  return <SwiperCarosel items={slides} />;
};


export default TopProduct;
