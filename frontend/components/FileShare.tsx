"use client"
import React from 'react'

const FileShare = () => {
  return (
    <div className="p-5 rounded-2xl group bg-[#42424a] transition-all duration-500">
      <div className='border-dashed rounded-2xl group-hover:bg-slate-800 h-80 w-[70vw] cursor-pointer flex flex-col items-center justify-center border-[3px] border-gray-500 transition-colors duration-500'>
        <span className='border-orange-600 rounded-full border-[3px] text-orange-600 w-16 h-16 flex items-center justify-center text-5xl mb-5'>+</span>
        <span className='text-2xl text-center mx-4'>Click to browse or drag files here to start sharing</span>
      </div>
    </div>
  )
}

export default FileShare;
