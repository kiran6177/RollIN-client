import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

function ScrollToTop() {
    const {pathname} = useLocation()
  useEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])
}

export default ScrollToTop
