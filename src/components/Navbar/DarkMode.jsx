import React from 'react'
import darkPng from '../../assets/dark-mode.png'
import lightPng from '../../assets/light-mode.png'

const DarkMode = () => {
    const [theme, setTheme] = React.useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    );
    const element = document.documentElement;

    React.useEffect(() => {
        if (theme === 'dark') {
            element.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            element.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const changeTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <>
            <div className='relative'>
                <img src={darkPng} alt="Dark Mode Icon" className={`w-12 absolute right-0 z-10 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`} onClick={changeTheme} />
                <img src={lightPng} alt="Light Mode Icon" className='w-12 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300' onClick={changeTheme} />
            </div>
        </>
    )
}

export default DarkMode
