import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink, Link, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../../redux/cartSlice";
import { fetchHeaderSettings } from '../../redux/headerSlice';
import { fetchMenus, selectMenuTree } from '../../redux/menuSlice';
import AnimatedSearch from './AnimatedSearch';
 
const BASE_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_PATH;

const CustomNavbar = ({ setOpen }) => {
  const location = useLocation();

  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();

  const { data: headerData, loading: headerLoading } = useSelector((state) => state.header);
  const menuTree = useSelector(selectMenuTree);
  const { loading: menusLoading } = useSelector((state) => state.menu);


  useEffect(() => {
    dispatch(fetchHeaderSettings());
    dispatch(fetchMenus());
  }, []);
  // console.log("Menu Setting:", menus);

  const getMenuPath = (menu) => {
    // if (menu.page_type === 2) {
    //   return `/static/${menu.slug}`;
    // }
    return `/${menu.slug}`;
  };

  const isDropdownActive = (menu) => {
    return (
      location.pathname === getMenuPath(menu) ||
      menu.submenus?.some((submenu) =>
        location.pathname.startsWith(getMenuPath(submenu))
      )
    );
  };

  const CustomToggle = React.forwardRef(
    ({ children, onClick, active }, ref) => (
      <a
        href="#"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        className={`nav-link dropdown-toggle ${active ? "active" : ""
          }`}
      >
        {children}
      </a>
    )
  );

  return (

    <header className="navbar-wrapper border-bottom bg-white shadow-sm">
      <Container>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center py-2">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center justify-content-center mt-3">
            {/* <span className="logo-text me-1">N</span>
            <strong className="brand-text">UTTDRY</strong> */}
            {headerLoading ? (
              "Loading..."
            ) : headerData ? (
              <img
                src={`${IMAGE_URL}/${headerData.logo}`}
                alt="Logo"
                style={{ width: '130px' }}
              />
            ) : null}
          </Navbar.Brand>

          <div className="d-flex align-items-center gap-2">
            {<AnimatedSearch />}

          </div>


          <div className="d-flex align-items-center gap-4 for-cart-section">
            <div className="text-center">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  "text-decoration-none  icon-wrapper " + (isActive ? "active" : "")
                }
              >
                <i className="bi bi-person-fill-down"></i>
                <div className="icon-label">Account</div>
              </NavLink>
            </div>
            <div className="text-center ">
              <div className='i-wrap' onClick={() => setOpen(true)}>
                <span style={{ position: "absolute", zIndex: 999, fontSize: "12px", color: "#fff", margin: "6px 6px" }}>{cartCount}</span>
                <a href="#"><i style={{ position: "relative" }} className="bi bi-cart-fill cart-icon"></i></a>
              </div>
              <div className="icon-label">Cart</div>
            </div>
          </div>
        </div>

        <hr />

        <Navbar expand="lg" className="pt-0 pb-2">
          <Container className="p-0">

            {/* ✅ Only ONE toggle */}
            <Navbar.Toggle aria-controls="nav-collapse" />

            <Navbar.Collapse id="nav-collapse">
              <nav className="nav-links d-flex flex-column flex-lg-row justify-content-center w-100 gap-2 gap-lg-4 mt-2 mt-lg-0">
                <ul className="nav-links d-flex flex-column flex-lg-row justify-content-center w-100 gap-2 gap-lg-4 mt-2 mt-lg-0 navbar-nav">

                  {menusLoading ? (
                    <li className="nav-item">Loading...</li>
                  ) : (
                    menuTree.map((menu) => (
                      <li key={menu.id} className="nav-item" >

                        {/* ===== Dropdown Menu ===== */}
                        {menu.submenus && menu.submenus.length > 0 ? (

                          <NavDropdown
                            title={menu.title}
                            id={`nav-dropdown-${menu.id}`}
                            active={isDropdownActive(menu)}
                          >
                            {menu.submenus.map((submenu) => (
                              <NavDropdown.Item
                                key={submenu.id}
                                as={NavLink}
                                to={getMenuPath(submenu)}
                                className="dropdown-item"
                              >
                                {submenu.title}
                              </NavDropdown.Item>
                            ))}
                          </NavDropdown>

                        ) : (

                          /* ===== Normal Menu ===== */
                          <NavLink
                            to={getMenuPath(menu)}
                            className={({ isActive }) =>
                              "nav-link " + (isActive ? "active fw-bold" : "")
                            }
                          >
                            {menu.title}
                          </NavLink>

                        )}

                      </li>
                    ))
                  )}

                </ul>
              </nav>
            </Navbar.Collapse>

          </Container>
        </Navbar>

      </Container>
    </header>
  );
};

export default CustomNavbar;
