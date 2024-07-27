import React, { useImperativeHandle, useState } from 'react'

function ToggleButton({data,setToFilter,removeFromFilter,setAdded,type},ref) {
    const [active,setActive] = useState('')

    useImperativeHandle(ref,()=>{
        return{
            reset:()=>{
                setActive('')
            }
        }
    })
  return (
    <button onClick={()=>
        {
            if(active === ''){
                setActive('bg-[#f6ae2d] text-black ')
                setToFilter({type,data})
                setAdded(true)
            }else{
                setActive('')
                removeFromFilter(data)
            }
        }
    } className={active+`border-2 border-[#f6ae2d] rounded-full px-6 py-1  font-medium text-xs md:text-sm`}>{data}</button>
  )
}

export default React.forwardRef(ToggleButton)
