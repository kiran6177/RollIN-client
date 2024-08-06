import React, { createContext, useEffect, useState } from 'react'
export const LoadingContext = createContext(null);

//RELOAD_RECOGNITION
function LoadingProvider({children}) {
    const [firstLoad,setFirstLoad] = useState(false);

  return (
    <LoadingContext.Provider value={{firstLoad,setFirstLoad}} >{children}</LoadingContext.Provider>
  )
}

export default LoadingProvider
