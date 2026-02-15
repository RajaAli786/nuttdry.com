import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const StaticPage = ({ id }) => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchStaticPage = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/page/${id}`
        );

        setPageData(response.data.data);
      } catch (error) {
        console.error("Static page fetch error:", error);
        setPageData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStaticPage();
  }, [id]);

  useEffect(() => {
    if (pageData) {
      document.title = pageData.meta_title || pageData.title;
    }
  }, [pageData]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="text-center py-5">
        <h4>Page not found</h4>
      </div>
    );
  }

  return (
    <>
    <Helmet>
            <title>
              {slug ? slug.replace("-", " ") + " | NuttDry" : "Products | NuttDry"}
            </title>
            <meta
              name="description"
              content={`Buy ${slug ? slug.replace("-", " ") : "healthy dry fruits"} online at best price`}
            />
          </Helmet>
    <div className="static-page-wrapper py-5 shadow">
      <Container>
        
        {/* Page Heading */}
        {/* <Row className="mb-5">
          <Col>
            <h1 className="page-title text-capitalize">
              {pageData.menu?.name}
            </h1>
            <div className="title-underline"></div>
          </Col>
        </Row> */}

        {/* Page Content */}
        <Row className="align-items-start">
          <Col lg={12}>
            <div
              className="page-content"
              dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default StaticPage;
