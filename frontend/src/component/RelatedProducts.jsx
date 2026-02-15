import React from "react";
import { useSelector } from "react-redux";
import Cards from "./common/Cards";
import { IMAGE_URL } from "../config";

function RelatedProducts({ currentProductId }) {
  const { relatedItems } = useSelector((state) => state.products);

  const filteredItems = (relatedItems || []).filter(
    (item) => item.id !== currentProductId
  );

  if (!filteredItems.length) return null;

  return (
    <div className="related-products my-4">
      <h4 className="mb-4">Related Products</h4>

      <div className="row">
        {filteredItems.map((item) => (
          <div key={item.id} className="col-6 col-md-4 col-lg-3 mb-4">
            <Cards
              productId={item.id}
              slug={item.slug}
              title={item.name}
              img={
                item.primary_image?.image
                  ? `${IMAGE_URL}/${item.primary_image.image}`
                  : ""
              }
              price={item.primary_size?.price}
              tags={item.tags}
              old_price={item.primary_size?.old_price}
              size={item.primary_size?.size}
              taxPercent={item.tax}
              taxTitle={item.tax_title}
              button={[
                {
                  label: (
                    <>
                      <i className="fa fa-cart-arrow-down me-2" />
                      Add to Cart
                    </>
                  ),
                  color: "success",
                },
              ]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
