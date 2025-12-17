import React from 'react'
import img1 from '../../assets/pokebowl.png'
import img2 from '../../assets/steakbowl.png'
import img3 from '../../assets/chickenbowl.png'

const ServicesData = [
    {
        id: 1,
        img: img1,
        name: 'Poke Bowl',
        description: 'Enjoy a variety of fresh and healthy poke bowls made with high-quality ingredients.',
    },
    {
        id: 2,
        img: img2,
        name: 'Steak Bowl',
        description: 'Savor our delicious steak bowls, cooked to perfection and served with your choice of sides.',
    },
    {
        id: 3,
        img: img3,
        name: 'Chicken Bowl',
        description: 'Enjoy our flavorful chicken bowls, made with tender chicken and fresh ingredients for a satisfying meal.',
    },
];

const Services = ({ onAddToCartAndOpen }) => {
    return (
        <>
            <div className='py-10 dark:bg-gray-900 dark:text-white duration-200'>
                <div className='container'>
                    {/* header section */}
                    <div className='text-center mb-20 max-w-[400px] mx-auto'>
                        <p className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
                            Our Menu
                        </p>
                        <h1 className='text-3xl font-bold'>Menu</h1>
                        <p className='text-xs text-gray-400'> {' '} We offer a variety of delicious meals prepared with fresh ingredients and exceptional service.</p>
                    </div>
                    {/* card section */}
                    <div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center'>
                            {ServicesData.map(({ id, img, name, description }) => {
                                return (
                                    <div key={id} className='max-w-[300px] group rounded-2xl bg-white dark:bg-gray-800 dark:hover:bg-primary hover:bg-primary hover:text-white duration-300 shadow-xl overflow-visible relative'>
                                        <div className='h-[120px]'>
                                            <img src={img} alt={name} className='max-w-[200px] mx-auto block transform -translate-y-14 group-hover:scale-105 group-hover:rotate-6 duration-300'/>
                                        </div>
                                        <div className='p-4 text-center pb-4 group-hover:pb-16 transition-all duration-300'>
                                            <h1 className='text-xl font-bold'>{name}</h1>
                                            <p className='text-gray-500 text-sm line-clamp-2 group-hover:text-white duration-300'>{description}</p>
                                        </div>
                                        {/* Add to Cart Button - appears on hover */}
                                        <div className='absolute inset-x-0 bottom-0 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-b-2xl overflow-hidden pointer-events-none group-hover:pointer-events-auto'>
                                            <button 
                                                onClick={() => onAddToCartAndOpen && onAddToCartAndOpen({ id, name, img, description })}
                                                className='w-full bg-white dark:bg-gray-900 text-primary font-bold py-3 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 pointer-events-auto'
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Services
