import { useDraggable } from '@dnd-kit/core';
import React from 'react'
import { MdChair } from 'react-icons/md'

function DragSeat({id}) {
    const { attributes, listeners, setNodeRef, transform} = useDraggable({
        id
    });
 
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };
  return (
    <div className='w-[10%] m-10' style={style}  ref={setNodeRef} {...listeners} {...attributes}>
        <MdChair className='text-[#f6ae2d] w-[60%] h-[60%]'  />
    </div>
  )
}

export default DragSeat
