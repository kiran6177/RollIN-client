import React, { useEffect, useState } from 'react'

function useDebounce(input) {
  const [debouncedValue,setDebouncedValue] = useState('')

  useEffect(()=>{
    const timeout = setTimeout(()=>{
        setDebouncedValue(input)
    },250)
    return ()=>{
        clearTimeout(timeout)
    }
  },[input])

  return [debouncedValue]
}

export default useDebounce