import React from 'react'
import bg from '../../assets/background1.png'
import pokebowl from '../../assets/pokebowl.png'
import steakbowl from '../../assets/steakbowl.png'
import chickenbowl from '../../assets/chickenbowl.png'

const ImageList = [
    {
        id: 1,
        img: pokebowl,
    },
    {
        id: 2,
        img: steakbowl,
    },
    {
        id: 3,
        img: chickenbowl,
    },
];

const bgImage = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
};

const Hero = () => {
    const [imageId, setImageId] = React.useState(pokebowl);
    return (
        <>
            <div style={bgImage}
                className='min-h-[550px] sm:min-h-[600px] bg-gray-100 dark:bg-gray-950 dark:text-white duration-200 flex justify-center items-center'
            >
                <div className='container pb-8 sm:pb-0'>
                    <div className='grid grid-cols-1 sm:grid-cols-2'>
                        {/* text content section */}
                        <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1'>
                            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold'>Welcome to the Poke Fusion</h1>
                            <p className='text-sm'>Experience fresh, vibrant flavor at our Asian-inspired poke restaurant, where traditional Pacific Island bowls meet bold, modern tastes. We craft every bowl with premium sushi-grade fish, crisp vegetables, and house-made sauces infused with flavors from across Asia. From customizable signature creations to refreshing teas and sides, every bite is designed to be colorful, nourishing, and unforgettable. Whether you're grabbing a quick lunch or settling in for a flavorful escape, our poke is crafted to energize, excite, and satisfy..</p>
                            <div>
                                <a href="#menu" className='bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full hover:scale-105 hover:shadow-lg duration-300 inline-block'>Order Now</a>
                            </div>
                        </div>
                        {/* image section */}
                        <div className='order-1 sm:order-2 min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative'>
                            {/* main image section */}
                            <div className='flex justify-center items-center h-[300px] sm:h-[450px] overflow-hidden'>
                                <img src={imageId} alt="" className='w-[300px] sm:w-[450px] mx-auto spin' />
                            </div>
                            {/* image list section */}
                            <div className='flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute bottom-[0px] lg:-right-10 bg-white/30 rounded-full'>
                                {ImageList.map((image) => (
                                    <img key={image.id} src={image.img} alt="" className='max-w-[80px] h-[80px] object-contain inline-block hover:scale-105 duration-200' onClick={() => {setImageId(image.id === 1 ? pokebowl : image.id === 2 ? steakbowl : chickenbowl)}}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero
