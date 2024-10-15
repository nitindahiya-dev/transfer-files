import Image from 'next/image';
import React from 'react';

const AboutUs = () => {
  return (
    <div className='max-w-6xl mx-auto text-center min-h-screen'>
      <h2 className='text-4xl font-extrabold mb-5'>What is ToffeeShare?</h2>
      <Image
        src={"/about-us.png"}
        width={800}
        height={400}
        alt='about us image'
        style={{ width: '100%', height: 'auto' }}
      />

      <p className='text-xl mb-5'>We are a free and independent peer-to-peer (P2P) file sharing service from the Netherlands that prioritizes your privacy and keeps your data safe. We store nothing online: simply close your browser to stop sending.
      </p>
      <p className='text-xl mb-5'>Our mission is to make sure people keep their data safely into their own hands, as it should be.</p>
    </div>
  );
}

export default AboutUs;
