import React from 'react'

import img1 from '../../assets/pokebowl.png'
import { GrSecure } from 'react-icons/gr'
import { IoFastFood } from 'react-icons/io5'
import { GiFoodTruck } from 'react-icons/gi'

const Banner = () => {
    return (
        <>
            <div className='min-h-[550px] dark:bg-gray-900 dark:text-white duration-200 pb-4'>
                <div>
                    <div data-aos='slide-up' data-aos-duration='300' className='container'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            {/* image section */}
                            <div>
                                <img src={img1} alt="Poke Bowl" className='max-w-[430px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,0.1)]' />
                            </div>
                            {/* text-content section */}
                            <div className='flex flex-col justify-center gap-6 sm:pt-0'>
                                <h1 className='text-3xl sm:text-4xl font-bold'>
                                    Delicious Meals Delivered To You
                                </h1>
                                <p className='text-sm text-gray-500 tracking-wide leading-5'>
                                    Experience fresh, vibrant flavor at our Asian-inspired poke restaurant, where traditional Pacific Island bowls meet bold, modern tastes. We craft every bowl with premium sushi-grade fish, crisp vegetables, and house-made sauces infused with flavors from across Asia.
                                    <br />
                                    <br />
                                    From customizable signature creations to refreshing teas and sides, every bite is designed to be colorful, nourishing, and unforgettable. Whether you're grabbing a quick lunch or settling in for a flavorful escape, our poke is crafted to energize, excite, and satisfy.
                                </p>
                                <div className='flex gap-6'>
                                    <div>
                                        <GrSecure className='text-4xl h-20 w-20 shadow-sm p-5 rounded-full bg-violet-100 dark:bg-violet-400' />
                                    </div>
                                    <div>
                                        <IoFastFood className='text-4xl h-20 w-20 shadow-sm p-5 rounded-full bg-orange-100 dark:bg-orange-400' />
                                    </div>
                                    <div>
                                        <GiFoodTruck className='text-4xl h-20 w-20 shadow-sm p-5 rounded-full bg-green-100 dark:bg-green-400' />
                                    </div>
                                </div>
                                <div>
                                    <button className='bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full hover:scale-105 duration-200'>Order Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Banner
