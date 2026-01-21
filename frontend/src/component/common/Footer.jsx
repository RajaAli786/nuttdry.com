import React, { useEffect, useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import api from "../../api/http";

const Footer = () => {
  const [footer, setFooter] = useState(null);
  const [footerMenu, setFooterMenu] = useState([]);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await api.get("/footer-setting");
        setFooter(res.data.data);
      } catch (err) {
        console.error("Footer API Error", err);
      }
    };

    fetchFooter();
  }, []);

  useEffect(() => {
    const fetchFooterMenu = async () => {
      try {
        const res = await api.get("/footer-menu");
        setFooterMenu(res.data.data);
      } catch (err) {
        console.error("Footer API Error", err);
      }
    };

    fetchFooterMenu();
  }, []);

  if (!footer) return null;

  const getMenuLinks = (columnTitle) => {
    return footerMenu.filter((menu) => menu.column === columnTitle && menu.status === 1);
  };

  // console.log("Footer :", footer);

  return (
    <footer className="bg-light pt-5 border-top">
      <div className="container">
        <div className="row">
          {/* ===== CUSTOMER CARE ===== */}
          <div className="col-md-3 mb-4">
            <h5>Customer Care</h5>

            <p>
              <strong>Address:</strong> {footer.contact.address}
            </p>
            <p>
              <strong>Phone:</strong> {footer.contact.phone}
            </p>
            <p>
              <strong>Timings:</strong> {footer.contact.timings}
            </p>
            <p>
              <strong>Email:</strong> {footer.contact.email}
            </p>

            <div className="d-flex gap-3 mt-2">
              {footer.social_links.facebook && (
                <a href={footer.social_links.facebook} style={{ color: '#000' }} target="_blank">
                  <i className="fa fa-facebook fs-4"></i>
                </a>
              )}
              {footer.social_links.youtube && (
                <a href={footer.social_links.youtube} target="_blank">
                  <i className="fa fa-youtube fs-4"></i>
                </a>
              )}
              {footer.social_links.instagram && (
                <a href={footer.social_links.instagram} target="_blank">
                  <i className="fa fa-instagram fs-4"></i>
                </a>
              )}
              {footer.social_links.linkedin && (
                <a href={footer.social_links.linkedin} target="_blank">
                  <i className="fa fa-linkedin fs-4"></i>
                </a>
              )}
            </div>
          </div>

          <div className="col-md-3" >
            <h5>ABOUT NUTTDRY</h5>
            <ul className="list-unstyled mt-3">
              <li>
                <NavLink to="/our-story" className="text-dark text-decoration-none">
                  Our Story
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-md-3" >
            <h5>SUPPORT</h5>
            <ul className="list-unstyled mt-3">
              <li>
                <NavLink to="/login" className="text-dark text-decoration-none">
                  My Account
                </NavLink>
              </li>

              <li>
                <NavLink to="/login" className="text-dark text-decoration-none">
                  Track Order
                </NavLink>
              </li>

              <li>
                <NavLink to="/return-exchange" className="text-dark text-decoration-none">
                  Return/Exchange
                </NavLink>
              </li>
            </ul>
          </div>

          {footer.map_link && footer.map_link.trim() !== "" && (
            <div className="col-md-3 mb-4">
              <h5>REACH US</h5>
              <iframe
                src={footer.map_link}
                width="100%"
                height="250"
                style={{ border: '2px solid #ccc', borderRadius: '10px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          )}

        </div>
      </div>

      {/* ===== COPYRIGHT ===== */}
      <div className="text-center mt-4 py-2 border-top last-footer">
        <small>{footer.copyright}</small>
      </div>
    </footer>
  );
};

export default Footer;
