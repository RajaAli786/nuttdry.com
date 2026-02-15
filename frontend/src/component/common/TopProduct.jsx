import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "./Cards";
import { fetchTopProducts } from "../../redux/productSlice";

const IMAGE_URL = import.meta.env.VITE_IMAGE_PATH;

const TopProduct = () => {
  const dispatch = useDispatch();
  const { topItems, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  if (loading) return null;
  if (!topItems || !topItems.length) return null;

  return (
    <div className="container"> 
      <div className="row">
        {topItems.map((product) => (
          <div key={product.id} className="col-6 col-md-4 col-lg-3 mb-4">
            <Cards
              productId={product.id}
              slug={product.slug}
              title={product.name}
              img={
                product.primary_image?.image
                  ? `${IMAGE_URL}/${product.primary_image.image}`
                  : ""
              }
              price={product.primary_size?.price}
              old_price={product.primary_size?.old_price}
              size={product.primary_size?.size}
              tags={product.tags}
              taxPercent={product.tax}
              taxTitle={product.tax_title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProduct;
