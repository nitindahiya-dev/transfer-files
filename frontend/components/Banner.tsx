'use client'
import React from 'react';
import FileShare from './FileShare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfinity, faBolt, faShieldHalved, faFileWaveform, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Banner = () => {
    // Smooth scroll function
    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className='flex gap-16 flex-col max-w-screen-2xl mx-auto mt-[5vh] min-h-screen'>
            <div className="flex items-center justify-center">
                <FileShare />
            </div>

            <div className="flex flex-col items-center justify-center">
                <h1 className='text-4xl md:text-3xl sm:text-2xl mb-4 text-center'>Share files directly from your device to anywhere</h1>
                <p className="text-md text-center">Send files of any size directly from your device without ever storing anything online.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faInfinity} className='w-8' />
                        <span>No file size limit</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faBolt} className='w-8' />
                        <span>Blazingly fast</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faShieldHalved} className='w-8' />
                        <span>Peer-to-peer</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faFileWaveform} className='w-8' />
                        <span>End-to-end encrypted</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className="w-16 border-[2px] p-4 rounded-full animate-bounce cursor-pointer" 
                    onClick={handleScroll}
                />
            </div>
        </div>
    );
}

export default Banner;
