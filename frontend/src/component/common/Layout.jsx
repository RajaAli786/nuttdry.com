import React, {useState} from 'react'
import Topbar from './Topbar'
import CustomNavbar from './Header'
import Footer from './Footer'
import CartDrawer from '../CartDrawer'



function Layout({children}) {
  const [open, setOpen] = useState(false);
  return (
    <>
        <Topbar/>
        <CustomNavbar setOpen={setOpen}/>
        <CartDrawer open={open} setOpen={setOpen} />
        {children}
        <Footer/>
    </>
  )
}

export default Layout