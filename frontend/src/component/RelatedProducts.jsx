import React from "react";
import { useSelector } from "react-redux";
import Cards from "./common/Cards";
import SwiperCarosel from "./common/SwiperCarosel";
import { IMAGE_URL } from "../config";

function RelatedProducts({ currentProductId }) {
  const { relatedItems } = useSelector((state) => state.products);

  const relatedSlides = (relatedItems || [])
    .filter((item) => item.id !== currentProductId)
    .map((item) => ({
      id: item.id,
      content: (
        <Cards
          productId={item.id}
          slug={item.slug}
          title={item.name}
          img={
            item.primary_image?.image
              ? `${IMAGE_URL}/${item.primary_image.image}`
              : ""
          }
          price={item.price}
          tags={item.tags}
          old_price={item.old_price}

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
      ),
    }));

  if (!relatedSlides.length) return null;

  return (
    <div className="">
      {/* <h4 className="mb-4 fw-bold">Related Products</h4> */}
      <SwiperCarosel items={relatedSlides} />
    </div>
  );
}

export default RelatedProducts;
