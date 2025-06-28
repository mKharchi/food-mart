import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/asset'

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-[1px]  border-gray-400 '>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <NavLink

                    className={
                        "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-3"
                    } to={'/add'}>
                    <img className='w-5 h-5' src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Add Tables</p>
                </NavLink>


                <NavLink className={
                    "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-3"
                } to={'/list'}>
                    <img className='w-5 h-5' src={assets.order_icon} alt="" />
                    <p className='hidden md:block'>List Resevations</p>
                </NavLink>
                <NavLink className={
                    "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-3"
                } to={'/menu'}>
                    <img className='w-5 h-5' src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Menu</p>
                </NavLink>



            </div>
        </div>
    )
}

export default Sidebar