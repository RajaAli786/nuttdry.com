// ProductList.jsx
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Layout from "./common/Layout";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import { Helmet } from "react-helmet-async";


import {
  fetchProducts,
  setTop,
  setFeatured,
  setNew,
  setCategory,
  setPage,
} from "../redux/productSlice";

const ProductList = ({defaultSlug}) => {
  const dispatch = useDispatch();
  // const { slug } = useParams();
  const { slug: slugParam } = useParams();
  const slug = slugParam || defaultSlug;

  const {
    page,
    limit,
    search,
    category,
    priceRange,
    sort,
    is_top,
    is_featured,
    is_new,
  } = useSelector((state) => state.products);

  
  const { items: categories = [] } = useSelector(
    (state) => state.category
  );

  /* =========================
     HANDLE SLUG FILTER
  ========================= */
  useEffect(() => {
    // console.log("RAW SLUG →", slug);
    // console.log("CATEGORIES LENGTH →", categories.length);
    if (!slug) return;

    dispatch(setTop(""));
    dispatch(setFeatured(""));
    dispatch(setNew(""));
    dispatch(setCategory(""));
    dispatch(setPage(1));

    if (slug === "best-sellers") {
      dispatch(setTop(1));
      return;
    }

    if (slug === "featured-products") {
      // console.log("DISPATCH FEATURE PRODUCTS");
      dispatch(setFeatured(1));
      return;
    }

    if (slug === "new-products") {
      // console.log("DISPATCH NEW PRODUCTS");
      dispatch(setNew(1));
      return;
    }

    const cat = categories.find((c) => c.slug === slug);
    if (cat) {
      dispatch(setCategory(cat.id));
    }
  }, [slug, categories, dispatch]);
  

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, page, limit, search, category, priceRange, sort, is_top, is_featured, is_new]);

  // useEffect(() => {
  //   console.log("FILTERS →", {
  //     is_top,
  //     is_featured,
  //     is_new,
  //     category,
  //   });
  // }, [is_top, is_featured, is_new, category]);

  
  return (
    <Layout>
      <Helmet>
        <title>
          {slug ? slug.replace("-", " ") + " | NuttDry" : "Products | NuttDry"}
        </title>
        <meta
          name="description"
          content={`Buy ${slug ? slug.replace("-", " ") : "healthy dry fruits"} online at best price`}
        />
      </Helmet>

      <Container className="my-5">
        <Row className="mb-4">
          <h3 className="text-capitalize">
            {slug ? slug.replace("-", " ") : "Products"}
          </h3>
        </Row>

        <Row>
          <Col md={3}>
            <FilterSidebar />
          </Col>

          <Col md={9}>
            <ProductGrid />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ProductList;
