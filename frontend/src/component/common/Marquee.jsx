import React from 'react'

const TopMarquee = () => {
  return (
    <>
    <div className="marquee">
        <span>
          Easy Return & Refund &nbsp; | &nbsp; Free Shipping On Orders Above
          Rs.999 &nbsp; | &nbsp; COD Available &nbsp; | &nbsp; Easy Return &
          Refund &nbsp; | &nbsp; Free Shipping On Orders Above Rs.999 &nbsp; |
          &nbsp; COD Available
        </span>
      </div>
    </>
  )
}
const MiddleMarquee = () => {
  return (
    <>
    <div className="marquee">
        <span>Quality You Can Trust &nbsp; | &nbsp
        Customer Support That Cares &nbsp; | &nbsp
        Quality You Can Trust &nbsp; | &nbsp
        Customer Support That Cares &nbsp; | &nbsp
        Quality You Can Trust &nbsp; | &nbsp
        Customer Support That Cares &nbsp; | &nbsp
        Quality You Can Trust &nbsp; | &nbsp
        Customer Support That Cares &nbsp; | &nbsp
        Quality You Can Trust &nbsp; | &nbsp</span>
      </div>
    </>
  )
}

const BlankContainer = () => {
    return (
      <div className="container my-4">
        {/* This is a blank container for spacing */}
      </div>
    );
  }

const MarqueeContainer = ({children}) => {
    return (
      <div className="marquee-container py-3">
        {children}
      </div>
    );
  };
  

export { TopMarquee, MiddleMarquee, MarqueeContainer, BlankContainer }