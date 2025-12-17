import React, { useState } from 'react'
import { FaShoppingCart, FaTimes, FaPlus, FaMinus } from 'react-icons/fa'
import pokebowl from '../../assets/pokebowl.png'
import steakbowl from '../../assets/steakbowl.png'
import chickenbowl from '../../assets/chickenbowl.png'
import CheckoutDialog from '../CheckoutDialog/CheckoutDialog'

const menuItems = [
    {
        id: 1,
        name: "Poke Bowl",
        description: "Fresh salmon with rice, avocado, and sesame",
        price: 12.99,
        image: pokebowl
    },
    {
        id: 2,
        name: "Steak Bowl",
        description: "Grilled steak with vegetables and rice",
        price: 15.99,
        image: steakbowl
    },
    {
        id: 3,
        name: "Chicken Bowl",
        description: "Grilled chicken with fresh salad and rice",
        price: 11.99,
        image: chickenbowl
    }
]

const MenuDialog = ({ isOpen, onClose, initialCartItem }) => {
    const [cart, setCart] = useState([])
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

    // Add initial item to cart when dialog opens
    React.useEffect(() => {
        if (initialCartItem && isOpen) {
            const menuItem = menuItems.find(item => item.id === initialCartItem.id);
            if (menuItem) {
                addToCart(menuItem);
            }
        }
    }, [initialCartItem, isOpen])

    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id)
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ))
        } else {
            setCart([...cart, { ...item, quantity: 1 }])
        }
    }

    const removeFromCart = (itemId) => {
        const existingItem = cart.find(cartItem => cartItem.id === itemId)
        if (existingItem.quantity === 1) {
            setCart(cart.filter(cartItem => cartItem.id !== itemId))
        } else {
            setCart(cart.map(cartItem =>
                cartItem.id === itemId
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            ))
        }
    }

    const getItemQuantity = (itemId) => {
        const item = cart.find(cartItem => cartItem.id === itemId)
        return item ? item.quantity : 0
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
    }

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0)
    }

    const handleCheckout = () => {
        setIsCheckoutOpen(true)
    }

    const handleCheckoutClose = () => {
        setIsCheckoutOpen(false)
        setCart([])
        onClose()
    }

    if (!isOpen) return null

    return (
        <>
            <CheckoutDialog 
                isOpen={isCheckoutOpen} 
                onClose={handleCheckoutClose} 
                cart={cart}
                totalPrice={getTotalPrice()}
            />
            <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm' onClick={onClose}>
                <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[95%] max-w-4xl max-h-[90vh] overflow-hidden flex flex-col' onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700'>
                    <div>
                        <h2 className='text-3xl font-bold text-gray-800 dark:text-white'>Our Menu</h2>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>Select items to add to your cart</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                    >
                        <FaTimes className='text-2xl text-gray-600 dark:text-gray-300' />
                    </button>
                </div>

                {/* Content */}
                <div className='flex-1 overflow-y-auto p-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {menuItems.map((item) => {
                            const quantity = getItemQuantity(item.id)
                            return (
                                <div key={item.id} className='bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow'>
                                    <div className='relative mb-4'>
                                        <img src={item.image} alt={item.name} className='w-full h-48 object-contain rounded-lg' />
                                    </div>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-white mb-2'>{item.name}</h3>
                                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>{item.description}</p>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-2xl font-bold text-primary'>${item.price}</span>
                                        {quantity === 0 ? (
                                            <button
                                                onClick={() => addToCart(item)}
                                                className='bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300 flex items-center gap-2'
                                            >
                                                <FaPlus /> Add
                                            </button>
                                        ) : (
                                            <div className='flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-3 py-2 rounded-full'>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className='hover:scale-110 transition-transform'
                                                >
                                                    <FaMinus />
                                                </button>
                                                <span className='font-bold min-w-[20px] text-center'>{quantity}</span>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className='hover:scale-110 transition-transform'
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Footer / Cart Summary */}
                {cart.length > 0 && (
                    <div className='border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800'>
                        <div className='flex justify-between items-center mb-4'>
                            <div className='flex items-center gap-2'>
                                <FaShoppingCart className='text-primary text-xl' />
                                <span className='font-bold text-gray-800 dark:text-white'>{getTotalItems()} items in cart</span>
                            </div>
                            <div className='text-right'>
                                <p className='text-sm text-gray-600 dark:text-gray-400'>Total</p>
                                <p className='text-3xl font-bold text-primary'>${getTotalPrice()}</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            className='w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg'
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

export default MenuDialog
