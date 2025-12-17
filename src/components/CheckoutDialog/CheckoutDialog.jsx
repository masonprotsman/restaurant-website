import React, { useState } from 'react'
import { FaTimes, FaCreditCard, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'

const CheckoutDialog = ({ isOpen, onClose, cart, totalPrice }) => {
    const [step, setStep] = useState(1) // 1: Address, 2: Payment, 3: Confirmation
    const [formData, setFormData] = useState({
        // Address fields
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        // Payment fields
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    })

    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateAddressForm = () => {
        const newErrors = {}
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
        if (!formData.address.trim()) newErrors.address = 'Address is required'
        if (!formData.city.trim()) newErrors.city = 'City is required'
        if (!formData.state.trim()) newErrors.state = 'State is required'
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validatePaymentForm = () => {
        const newErrors = {}
        if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
        else if (formData.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Card number must be 16 digits'
        if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required'
        if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
        if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required'
        else if (formData.cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits'
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNextStep = () => {
        if (step === 1 && validateAddressForm()) {
            setStep(2)
        } else if (step === 2 && validatePaymentForm()) {
            setStep(3)
        }
    }

    const handlePlaceOrder = () => {
        // Here you would typically send the order to your backend
        console.log('Order placed:', { formData, cart, totalPrice })
        setTimeout(() => {
            onClose()
            setStep(1)
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                cardNumber: '',
                cardName: '',
                expiryDate: '',
                cvv: ''
            })
        }, 2000)
    }

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        const matches = v.match(/\d{4,16}/g)
        const match = (matches && matches[0]) || ''
        const parts = []
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }
        if (parts.length) {
            return parts.join(' ')
        } else {
            return value
        }
    }

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value)
        if (formatted.replace(/\s/g, '').length <= 16) {
            setFormData(prev => ({ ...prev, cardNumber: formatted }))
        }
    }

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm' onClick={onClose}>
            <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[95%] max-w-2xl max-h-[90vh] overflow-hidden flex flex-col' onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700'>
                    <div>
                        <h2 className='text-3xl font-bold text-gray-800 dark:text-white'>Checkout</h2>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Step {step} of 3 - {step === 1 ? 'Delivery Address' : step === 2 ? 'Payment' : 'Confirmation'}
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                    >
                        <FaTimes className='text-2xl text-gray-600 dark:text-gray-300' />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className='flex px-6 pt-4'>
                    <div className='flex-1 relative'>
                        <div className={`h-2 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                        <div className='absolute -top-1 left-0 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-white text-xs'>1</div>
                    </div>
                    <div className='flex-1 relative ml-2'>
                        <div className={`h-2 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                        <div className={`absolute -top-1 left-0 flex items-center justify-center w-4 h-4 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-300'} text-white text-xs`}>2</div>
                    </div>
                    <div className='flex-1 relative ml-2'>
                        <div className={`h-2 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                        <div className={`absolute -top-1 left-0 flex items-center justify-center w-4 h-4 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-gray-300'} text-white text-xs`}>3</div>
                    </div>
                </div>

                {/* Content */}
                <div className='flex-1 overflow-y-auto p-6'>
                    {/* Step 1: Address Form */}
                    {step === 1 && (
                        <div className='space-y-4'>
                            <div className='flex items-center gap-2 mb-4'>
                                <FaMapMarkerAlt className='text-primary text-xl' />
                                <h3 className='text-xl font-bold text-gray-800 dark:text-white'>Delivery Address</h3>
                            </div>
                            
                            <div>
                                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Full Name *</label>
                                <input
                                    type='text'
                                    name='fullName'
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white`}
                                    placeholder='John Doe'
                                />
                                {errors.fullName && <p className='text-red-500 text-xs mt-1'>{errors.fullName}</p>}
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Email *</label>
                                    <input
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white`}
                                        placeholder='john@example.com'
                                    />
                                    {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Phone *</label>
                                    <input
                                        type='tel'
                                        name='phone'
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white`}
                                        placeholder='(555) 123-4567'
                                    />
                                    {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>}
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Street Address *</label>
                                <input
                                    type='text'
                                    name='address'
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white`}
                                    placeholder='123 Main Street, Apt 4B'
                                />
                                {errors.address && <p className='text-red-500 text-xs mt-1'>{errors.address}</p>}
                            </div>

                            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>City *</label>
                                    <input
                                        type='text'
                                        name='city'
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white`}
                                        placeholder='Atlanta'
                                    />
                                    {errors.city && <p className='text-red-500 text-xs mt-1'>{errors.city}</p>}
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>State *</label>
                                    <input
                                        type='text'
                                        name='state'
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white`}
                                        placeholder='GA'
                                    />
                                    {errors.state && <p className='text-red-500 text-xs mt-1'>{errors.state}</p>}
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>ZIP Code *</label>
                                    <input
                                        type='text'
                                        name='zipCode'
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white`}
                                        placeholder='30301'
                                    />
                                    {errors.zipCode && <p className='text-red-500 text-xs mt-1'>{errors.zipCode}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Payment Form */}
                    {step === 2 && (
                        <div className='space-y-4'>
                            <div className='flex items-center gap-2 mb-4'>
                                <FaCreditCard className='text-primary text-xl' />
                                <h3 className='text-xl font-bold text-gray-800 dark:text-white'>Payment Information</h3>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Card Number *</label>
                                <input
                                    type='text'
                                    name='cardNumber'
                                    value={formData.cardNumber}
                                    onChange={handleCardNumberChange}
                                    className={`w-full px-4 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white`}
                                    placeholder='1234 5678 9012 3456'
                                    maxLength='19'
                                />
                                {errors.cardNumber && <p className='text-red-500 text-xs mt-1'>{errors.cardNumber}</p>}
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Cardholder Name *</label>
                                <input
                                    type='text'
                                    name='cardName'
                                    value={formData.cardName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border ${errors.cardName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white`}
                                    placeholder='John Doe'
                                />
                                {errors.cardName && <p className='text-red-500 text-xs mt-1'>{errors.cardName}</p>}
                            </div>

                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Expiry Date *</label>
                                    <input
                                        type='text'
                                        name='expiryDate'
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white`}
                                        placeholder='MM/YY'
                                        maxLength='5'
                                    />
                                    {errors.expiryDate && <p className='text-red-500 text-xs mt-1'>{errors.expiryDate}</p>}
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>CVV *</label>
                                    <input
                                        type='text'
                                        name='cvv'
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white`}
                                        placeholder='123'
                                        maxLength='3'
                                    />
                                    {errors.cvv && <p className='text-red-500 text-xs mt-1'>{errors.cvv}</p>}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className='mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                                <h4 className='font-bold text-gray-800 dark:text-white mb-3'>Order Summary</h4>
                                {cart.map((item) => (
                                    <div key={item.id} className='flex justify-between text-sm mb-2'>
                                        <span className='text-gray-600 dark:text-gray-400'>{item.name} x {item.quantity}</span>
                                        <span className='text-gray-800 dark:text-white font-medium'>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className='border-t border-gray-300 dark:border-gray-600 mt-2 pt-2 flex justify-between'>
                                    <span className='font-bold text-gray-800 dark:text-white'>Total</span>
                                    <span className='font-bold text-primary text-xl'>${totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === 3 && (
                        <div className='text-center py-8'>
                            <FaCheckCircle className='text-green-500 text-6xl mx-auto mb-4' />
                            <h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-4'>Order Confirmed!</h3>
                            <p className='text-gray-600 dark:text-gray-400 mb-6'>Thank you for your order. Your food will be delivered to:</p>
                            
                            <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-left max-w-md mx-auto mb-6'>
                                <p className='text-gray-800 dark:text-white font-semibold'>{formData.fullName}</p>
                                <p className='text-gray-600 dark:text-gray-400'>{formData.address}</p>
                                <p className='text-gray-600 dark:text-gray-400'>{formData.city}, {formData.state} {formData.zipCode}</p>
                                <p className='text-gray-600 dark:text-gray-400 mt-2'>{formData.phone}</p>
                                <p className='text-gray-600 dark:text-gray-400'>{formData.email}</p>
                            </div>

                            <div className='bg-primary/10 rounded-lg p-4 mb-6'>
                                <p className='text-gray-800 dark:text-white font-bold text-xl'>Total: ${totalPrice}</p>
                            </div>

                            <p className='text-sm text-gray-500 dark:text-gray-400'>Estimated delivery time: 30-45 minutes</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className='border-t border-gray-200 dark:border-gray-700 p-6 flex justify-between'>
                    {step > 1 && step < 3 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className='px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300'
                        >
                            Back
                        </button>
                    )}
                    {step < 3 ? (
                        <button
                            onClick={handleNextStep}
                            className='ml-auto bg-gradient-to-r from-primary to-secondary text-white px-8 py-2 rounded-full hover:scale-105 transition-transform duration-300 font-semibold'
                        >
                            {step === 1 ? 'Continue to Payment' : 'Review Order'}
                        </button>
                    ) : (
                        <button
                            onClick={handlePlaceOrder}
                            className='w-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full hover:scale-105 transition-transform duration-300 font-bold text-lg'
                        >
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CheckoutDialog
