import React from 'react'
import AppStoreImg from '../../assets/appstore.png'
import GoogleStoreImg from '../../assets/playstore.png'
import Gif from '../../assets/foodgif.gif'

const AppStore = () => {
    return (
        <>
            <div className='bg-gray-100 dark:bg-gray-800 py-14'>
                <div className='container'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-4'>
                        <div className='space-y-6 max-w-xl mx-auto'>
                            <h1 className='text-2xl text-center sm:text-left sm:text-4xl font-semibold dark:text-gray-400 text-gray-700'>
                                Poke Fusion is Available on IOS and Android
                            </h1>
                            <div className='flex flex-wrap justify-center sm:justify-start items-center'>
                                <a href="#">
                                    <img src={AppStoreImg} alt="App Store" className='max-w-[150px] sm:max-w-[120px] md:max-w-[200px]'></img>
                                </a>
                                <a href="#">
                                    <img src={GoogleStoreImg} alt="Google Play Store" className='max-w-[150px] sm:max-w-[120px] md:max-w-[200px]'></img>
                                </a>
                            </div>
                        </div>
                        <div>
                            <img src={Gif} alt="gif" className='max-w-[300px] mx-auto'></img>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppStore
