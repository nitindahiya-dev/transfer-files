"use client"
import React from 'react'

const Download = () => {
    return (
        <div className='p-5 w-[70vw] mx-auto my-10 rounded-2xl group bg-[#42424a] transition-all duration-500'>
            <div className="flex flex-col items-center justify-center border-[3px] border-dashed border-gray-500 h-80 hover:bg-slate-800">

            <p className='text-lg'>file Name: image.png</p>
            <p className='text-lg text-gray-300 mb-2'>file size: 2mb</p>

            <div className="text-center">
                <p>File will be deleted after download Expires: Oct 31, 2024 12:19 PM</p>

                <a href="#">Download Link</a>
            </div>
            </div>
</div>



    )
}

export default Download
