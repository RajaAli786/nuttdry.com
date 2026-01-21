import React from "react";
import Layout from "./common/Layout";
import OfferBanner from "./common/OfferBanner";
import SuperFlowSwiper from "./common/Slider";
import {
  MarqueeContainer,
  TopMarquee,
  MiddleMarquee,
  BlankContainer,
} from "./common/Marquee";

import {ProductHeader} from "./common/Product";
import TopProduct from "./common/TopProduct";
import FeatureProduct from "./common/FeatureProduct";
import NewProduct from "./common/NewProduct";

import Testimonials from "./Testimonials";

function Home() {
  return (
    <Layout>
      <SuperFlowSwiper />

      <MarqueeContainer>
        <TopMarquee />
      </MarqueeContainer>

      {/* TOP PRODUCTS */}
      <ProductHeader title="Top Products" link="/top-products" />
      <TopProduct />

      {/* FEATURED PRODUCTS */}
      <ProductHeader title="Featured Products" link="/featured-products" />
      <FeatureProduct />

      <BlankContainer />

      <MarqueeContainer className="my-4">
        <MiddleMarquee />
      </MarqueeContainer>

      <OfferBanner />

      {/* NEW PRODUCTS */}
      <ProductHeader title="New Products" link="/new-products" />
      <NewProduct />

      <Testimonials />
    </Layout>
  );
}

export default Home;
