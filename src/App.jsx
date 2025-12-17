import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Banner from './components/Banner/Banner'
import AppStore from './components/AppStore/AppStore'
import Testimonial from './components/Testimonial/Testimonial'
import Footer from './components/Footer/Footer'
import MenuDialog from './components/MenuDialog/MenuDialog'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  return (
    <>
      <MenuDialog isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Navbar onOpenMenu={handleOpenMenu} />
      <div id="home">
        <Hero onOpenMenu={handleOpenMenu} />
      </div>
      <div id="menu">
        <Services />
      </div>
      <Banner onOpenMenu={handleOpenMenu} />
      <AppStore />
      <Testimonial />
      <div id="contact">
        <Footer />
      </div>
    </>
  )
}

export default App
