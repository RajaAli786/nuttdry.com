import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "./common/Layout";
import OfferBanner from "./common/OfferBanner";
import SuperFlowSwiper from "./common/Slider";
import {
  // MarqueeContainer,
  TopMarquee,
  MiddleMarquee,
  BlankContainer,
} from "./common/Marquee";

import {ProductHeader} from "./common/Product";
import TopProduct from "./common/TopProduct";
import FeatureProduct from "./common/FeatureProduct";
import NewProduct from "./common/NewProduct";
import { fetchHeaderSettings } from '../redux/headerSlice';

import Testimonials from "./Testimonials";

import { Helmet } from "react-helmet-async";

function Home() {
  const dispatch = useDispatch();
  const { data: headerData, loading: headerLoading } = useSelector((state) => state.header);
  useEffect(() => {
      dispatch(fetchHeaderSettings());
    }, []);


  return (
    <Layout> 
      <Helmet>
        <title>
            {headerData?.page_title || "Buy Healthy Dry Fruits Online at Best Price in India | Dry Fruit Store"}
        </title>
        
        

        <meta
          name="keywords"
          content={headerData?.meta_keywords || "dry fruits online, buy dry fruits, premium dry fruits, healthy dry fruits, best price dry fruits, almonds online, cashews online, walnuts online, pistachios online, raisins online"}
        />
        <meta
          name="description"
          content={headerData?.meta_description || "Shop premium quality dry fruits online at the best prices in India. Explore our wide range of healthy and delicious dry fruits, including almonds, cashews, walnuts, and more. Enjoy fast delivery and exceptional customer service at Dry Fruit Store."}
        />
      </Helmet>

      <SuperFlowSwiper />

      <TopMarquee />

      {/* TOP PRODUCTS */}
      <ProductHeader title="Best Sellers" link="/best-Sellers" />
      <TopProduct />

      {/* FEATURED PRODUCTS */}
      <ProductHeader title="Featured Products" link="/featured-products" />
      <FeatureProduct />

      <BlankContainer />

      <MiddleMarquee />

      <OfferBanner />

      {/* NEW PRODUCTS */}
      <ProductHeader title="New Products" link="/new-products" />
      <NewProduct />

      <Testimonials />
    </Layout>
  );
}

export default Home;
