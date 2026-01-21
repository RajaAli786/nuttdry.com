import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Layout from "./common/Layout";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import { fetchProducts, setMenu, setCategory } from "../redux/productSlice";
import { fetchMenus, selectMenuTree } from "../redux/menuSlice";

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

  const menus = useSelector(selectMenuTree);
  const { items: categories = [] } = useSelector((state) => state.category);

  // 1️⃣ Fetch menus on mount
  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  // 2️⃣ Apply slug filters whenever menus/categories are available
  useEffect(() => {
    if (!slug) return;

    // Apply menu filter if slug matches a menu
    const menu = menus.find((m) => m.slug === slug);
    if (menu && menu.id !== menu_id) {
      dispatch(setMenu(menu.id));
      return;
    }

    // Apply category filter if slug matches a category
    const categoryItem = categories.find((c) => c.slug === slug);
    if (categoryItem && categoryItem.id !== category) {
      dispatch(setCategory(categoryItem.id));
      return;
    }

    // Optional: handle special slugs like top/featured/new products
    if (slug === "top-products") {
      dispatch(setMenu("")); // reset menu
      dispatch(setCategory(""));
      return;
    }
    if (slug === "featured-products") {
      dispatch(setMenu(""));
      dispatch(setCategory(""));
      return;
    }
    if (slug === "new-products") {
      dispatch(setMenu(""));
      dispatch(setCategory(""));
      return;
    }
  }, [slug, menus, categories, dispatch, menu_id, category]);

  // 3️⃣ Fetch products whenever filters are ready
  useEffect(() => {
    // fetch if menu_id or category is set, or for special slugs
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
