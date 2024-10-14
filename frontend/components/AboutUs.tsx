import Image from 'next/image'
import React from 'react'

const AboutUs = () => {
  return (
    <div>
        <h2>What is ToffeeShare?</h2>
        <Image src={"/about-us.png"} width={100} height={100} alt='about us image'/>
    </div>
  )
}

export default AboutUs