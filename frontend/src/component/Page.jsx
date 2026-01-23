import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Layout from "./common/Layout";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import { fetchProducts, setMenu, setCategory } from "../redux/productSlice";
import { fetchMenus, selectMenuTree, selectMenusRaw } from "../redux/menuSlice";

const Page = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  
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
    menu: menu_id,
  } = useSelector((state) => state.products);

  // const menus = useSelector(selectMenuTree);
  const menus = useSelector(selectMenusRaw);

  const { items: categories = [] } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  useEffect(() => {
    if (!slug) return;


    const menu = menus.find((m) => m.slug === slug);
    if (menu && menu.id !== menu_id) {

      dispatch(setMenu(menu.id));
      return;
    }

    const categoryItem = categories.find((c) => c.slug === slug);
    if (categoryItem && categoryItem.id !== category) {
      dispatch(setCategory(categoryItem.id));
      return;
    }

    if (slug === "top-products") {
      console.log("top-products slug detected");
      dispatch(setMenu("")); 
      dispatch(setCategory(""));
      return;
    }
    if (slug === "featured-products") {
      console.log("featured-products slug detected");
      dispatch(setMenu(""));
      dispatch(setCategory(""));
      return;
    }
    if (slug === "new-products") {
      console.log("new-products slug detected");
      dispatch(setMenu(""));
      dispatch(setCategory(""));
      return;
    }
  }, [slug, menus, categories, dispatch, menu_id, category]);

  useEffect(() => {
    if (!menu_id && !category && !["top-products", "featured-products", "new-products"].includes(slug))
      return;

    dispatch(
     
      fetchProducts({
        page,
        limit,
        search,
        menu_id,
        category_id: category,
        priceRange,
        sort,
        is_top,
        is_featured,
        is_new,
      })
    );
    
  }, [dispatch, page, limit, search, menu_id, category, priceRange, sort, is_top, is_featured, is_new, slug]);

  return (
    <Layout>
      <Container className="my-4">
        <Row>
          <Col lg={3} className="mb-4">
            <FilterSidebar />
          </Col>
          <Col lg={9}>
            <ProductGrid />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Page;
