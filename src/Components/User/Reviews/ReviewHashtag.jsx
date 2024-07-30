import React from 'react'

function ReviewHashtag({tag,count}) {
  return (
      <p className='border-2 border-[#f6ae2d] bg-black rounded-full py-2 px-4 max-w-fit text-xs flex items-center ' >
        {tag}  <span className='ml-3 bg-[#666] px-2 rounded-sm'>{count}</span></p>
  )
}

export default ReviewHashtag
