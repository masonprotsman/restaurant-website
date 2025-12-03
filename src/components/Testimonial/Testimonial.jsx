import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const testimonialData = [
    {
        id: 1,
        name: "John Doe",
        text: "This is an amazing service! Highly recommend to everyone.",
        image: "https://picsum.photos/101/101"
    },
    {
        id: 2,
        name: "Jane Smith",
        text: "A wonderful experience from start to finish.",
        image: "https://picsum.photos/102/102"
    },
    {
        id: 3,
        name: "Mike Johnson",
        text: "Exceptional quality and customer service.",
        image: "https://picsum.photos/103/103"
    }
];

const Testimonial = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
    };

    return (
        <>
            <div className='dark:bg-gray-900 dark:text-white duration-200 pt-10 pb-10'>
                <div className='container'>
                    {/* header section */}
                    <div className='text-center max-w-[400px] mx-auto'>
                        <p className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
                            Testimonials
                        </p>
                        <h1 className='text-3xl font-bold'>Customer Testimonials</h1>
                        <p className='text-xs text-gray-400'> {' '} Reviews from our satisfied customers</p>
                    </div>
                    {/* testimonial section */}
                    <div className='grid grid-cols-1 max-w-[600px] mx-auto gap-6'>
                        <Slider {...settings}>
                            {testimonialData.map(({ id, name, text, image }) => {
                                return (
                                    <div key={id} className='my-6'>
                                        <div className='flex flex-col justify-center items-center gap-4 text-center shadow-lg p-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative'>
                                            <img src={image} alt={name} className='rounded-full block mx-auto'/>
                                            <p className='text-gray-500 text-sm'>{text}</p>
                                            <h1 className='text-xl font-bold'>{name}</h1>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonial
