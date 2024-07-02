import { useDroppable } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react'
import { MdChair } from 'react-icons/md';

function GridBlock({id,layouts}) {
    const [isPlaced,setIsPlaced] = useState(false);

    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    const style = {
        backgroundColor: isOver ? '#fac35c4f' : undefined,
    };

    useEffect(()=>{
        if(layouts?.length > 0){
            layouts.forEach(data => {
                if(data?.id === id){
                    if(data.status){
                        setIsPlaced(true)
                    }else{
                        setIsPlaced(false)
                    }
                }
            });
        }else{
            setIsPlaced(false)
        }
    },[layouts])

  return (
        <div style={style} ref={setNodeRef}  className={`border-2 border-[#666666] aspect-square flex justify-center items-center`}>
            {isPlaced && <MdChair className='text-[#f6ae2d] w-[60%] h-[60%]' /> }
        </div>
  )
}

export default GridBlock
