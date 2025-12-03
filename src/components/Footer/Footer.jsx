import React from 'react'
import FooterLogo from '../../assets/logo.png'
import { FaLinkedin, FaLocationArrow, FaMobile, FaGithub } from 'react-icons/fa6'
const Footer = () => {
    return (
        <>
            <div className='dark:text-white bg-gray-100 dark:bg-gray-950 py-8'>
                <div className='max-w-[1200px] mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 py-5 justify-between'>
                        <div className='py-8 px-4 flex flex-col justify-between items-center'>
                            <h1 className='flex items-center gap-3 text-xl sm:text-3xl font-bold'>
                                <img src={FooterLogo} alt="Logo" className='max-w-[50px]' />
                                Poke Fusion
                            </h1>
                            <p>All Rights Reserved © 2025 Mason Protsman</p>
                            <br />
                        
                            <div className='flex items-center gap-3'>
                                <FaLocationArrow />
                                <p>Atlanta, GA</p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <FaMobile />
                                <p>+1 (404) 731-6991</p>
                            </div>
                            <div className='flex gap-4 mt-4'>
                                <a href="https://www.linkedin.com/in/mason-p-368a91202/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className='text-2xl hover:text-primary duration-300' />
                                </a>
                                <a href="https://github.com/masonprotsman" target="_blank" rel="noopener noreferrer">
                                    <FaGithub className='text-2xl hover:text-primary duration-300' />
                                </a>
                            </div>
                        </div>
                        <div className='pt-12 px-4 flex flex-col items-center'>
                            <h1 className='text-lg font-bold mb-3'>Important Links</h1>
                            <ul className='flex flex-col gap-2'>
                                <li><a href="#home" className='hover:text-primary duration-300'>Home</a></li>
                                <li><a href="#menu" className='hover:text-primary duration-300'>Menu</a></li>
                                <li><a href="#contact" className='hover:text-primary duration-300'>Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Footer
