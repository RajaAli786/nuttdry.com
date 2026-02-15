import React, {useState,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import Topbar from './Topbar'
import CustomNavbar from './Header'
import Footer from './Footer'
import CartDrawer from '../CartDrawer'
import { Helmet } from "react-helmet-async";
import { fetchHeaderSettings } from '../../redux/headerSlice';



function Layout({children}) {
  const dispatch = useDispatch();
  const { data: headerData, loading: headerLoading } = useSelector((state) => state.header);
  useEffect(() => {
      dispatch(fetchHeaderSettings());
    }, []);

  const [open, setOpen] = useState(false);
  return (
    <>
    <Helmet>
        <link
          rel="icon"
          type="image/png"
          href={
            headerData?.favicon
              ? `${import.meta.env.VITE_IMAGE_PATH}${headerData.favicon}`
              : "/favicon.ico"
          }
        />
      </Helmet>
        <Topbar/>
        <CustomNavbar setOpen={setOpen}/>
        <CartDrawer open={open} setOpen={setOpen} />
        {children}
        <Footer/>
    </>
  )
}

export default Layout