import React from 'react'
import Logo from '../../assets/logo.png'
import { FaCartShopping } from 'react-icons/fa6'
import DarkMode from './DarkMode'

const Navbar = () => {
    return (
        <>
            <div className='fixed top-0 left-0 right-0 z-50 shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200'>
                <div className='container py-3 sm:py-0'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <a href="#" className='flex items-center gap-2 text-2xl sm:text-3xl font-bold'>
                                <img src={Logo} alt="Logo" className='w-10' /> Poke Fusion
                            </a>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div>
                                <DarkMode />
                            </div>
                            <ul className='hidden sm:flex gap-4'>
                                <li><a className='inline-block py-4 px-4 hover:text-primary' href="#home">Home</a></li>
                                <li><a className='inline-block py-4 px-4 hover:text-primary' href="#menu">Menu</a></li>
                                <li><a className='inline-block py-4 px-4 hover:text-primary' href="#contact">Contact</a></li>
                            </ul>
                            <a href="#menu" className='bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full hover:scale-105 hover:shadow-2xl duration-300 flex items-center gap-3'>
                                Order
                                <FaCartShopping className='text-xl text-white drop-shadow-sm cursor-pointer' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
