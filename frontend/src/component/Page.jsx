import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Layout from "./common/Layout";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import { fetchProducts, setMenu, setCategory } from "../redux/productSlice";
import { fetchMenus, selectMenuTree, selectMenusRaw } from "../redux/menuSlice";
import StaticPage from "./StaticPage";
import SEO from "./common/SEO";

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

  const matchedMenu = menus.find((m) => m.slug === slug);

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

  console.log("Matched Menu:", matchedMenu);
  if (matchedMenu?.page_type === 2) {

    return (
      <Layout>
        <SEO
            key={slug}
            title={matchedMenu?.page_title ||
              matchedMenu?.meta_title ||
              "Products | Dry Fruit Store"}

            description={
              matchedMenu?.meta_description ||
              "Shop premium quality dry fruits online."
            }

            keywords={
              matchedMenu?.meta_keywords ||
              "dry fruits, almonds, cashews, walnuts"
            }
        />
        <StaticPage id={matchedMenu.id} />
      </Layout>
    );
  }
  else

  return (
    <Layout>
      <SEO
        key={slug}  
        title={matchedMenu?.page_title ||
            matchedMenu?.meta_title ||
            "Products | Dry Fruit Store"}
        description={
            matchedMenu?.meta_description ||
            "Shop premium quality dry fruits online."
          }
        keywords={
            matchedMenu?.meta_keywords ||
            "dry fruits, almonds, cashews, walnuts"
          }
        />
      <Container className="my-4">
        <Row className="mb-4">
          <h3 className="text-capitalize">
            {slug ? slug.replace("-", " ") : "Products"}
          </h3>
        </Row>
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
