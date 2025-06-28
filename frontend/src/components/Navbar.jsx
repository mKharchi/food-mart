import React, { useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const Navbar = () => {
    const [shown, setShown] = useState(false)
    const { isAuthenticated, logout } = useAuth()

    return (
        <div className='w-full absolute top-0 z-50 bg-transparent flex justify-between items-center py-3 px-4 lg:px-32'>
            <div className='w-1/2 justify-center items-center '>
                <img src="/Logo.png" alt="Logo" width={256} height={256} className='w-24 lg:w-30 h-8 lg:h-10 my-1' />
            </div>

            <div className='hidden lg:flex items-center text-xl gap-8 text-white justify-center w-1/2'>
                <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/">Home</NavLink>
                <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/menu">Menu</NavLink>
                <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/about">About Us</NavLink>
                <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/contact">Contact Us</NavLink>

            </div>

            <div className='hidden lg:flex items-center text-xl gap-8 text-white justify-end w-1/2'>
                {!isAuthenticated() ? (
                    <>
                        <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/signup">Sign Up</NavLink>
                        <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/login">Log In</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/my-reservations">My Reservations</NavLink>
                        <p className="hover:opacity-80 transition-all duration-200 ease-in cursor-pointer" onClick={logout}>Logout</p>
                    </>
                )}
            </div>
            <div className='flex lg:hidden w-1/2 items-center justify-end gap-4 px-2 text-xl'>
                <CiMenuBurger fill='#e0e0e0' onClick={() => setShown(prev => !prev)} />
            </div>

            {shown && (
                <div className='flex absolute top-14 bg-black rounded-lg px-4 py-2 right-6 flex-col items-end text-lg gap-3 text-white justify-end w-1/3'>
                    <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/">Home</NavLink>
                    <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/menu">Menu</NavLink>
                    <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/about">About Us</NavLink>
                    <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/contact">Contact Us</NavLink>
                    {!isAuthenticated() ? (
                        <>
                            <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/signup">Sign Up</NavLink>
                            <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/login">Log In</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink className="hover:opacity-80 transition-all duration-200 ease-in" to="/my-reservations">My Reservations</NavLink>
                            <p className="hover:opacity-80 transition-all duration-200 ease-in cursor-pointer" onClick={logout}>Logout</p>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default Navbar
