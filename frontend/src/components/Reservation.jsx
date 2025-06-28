import React, { useState } from "react"

import { useAuth } from "../context/authContext"
import { NavLink } from "react-router-dom"

const Reservation = () => {


    const { date, setDate, persons, setPersons, stamps, makeReservation, isAuthenticated } = useAuth()
    const personsTable = [2, 3, 4, 5, 6, 7]
    const [stamp, setStamp] = useState(stamps[0])



    const handleSubmit = (e) => {
        e.preventDefault()
        makeReservation(stamp)
    }
    return (<form
        onSubmit={handleSubmit}

        className='flex flex-col min-h-screen bg-[#EBF0E4]  w-full items-center justify-center py-8 px-16 2xl:py-16 gap-6 2xl:px-32'>
        <h1 className='w-full text-center text-4xl 2xl:text-7xl font-semibold'>Make a Reservation</h1>
        <p className="w-full 2xl:text-center"> Get in touch with restaurant</p>
        <div className=' my-6 2xl:my-24 w-full flex 2xl:flex-row flex-col items-center gap-12'>
            <input value={date} onChange={(e) => setDate(e.target.value)} className='w-full p-4 border' type="date" />
            <select value={stamp} onChange={(e) => setStamp(e.target.value)} className='w-full p-4  border'>
                {
                    stamps.map((st, index) => <option key={index} value={st} >{st}</option>)
                }
            </select>
            <select value={persons} onChange={(e) => setPersons(Number(e.target.value))}
                className='w-full p-4 border'>
                {
                    personsTable.map((el, index) => <option key={index} value={el}>{el}</option>)
                }
            </select>

        </div>

        <button type="submit" className='w-fit bg-black text-[#EBF0E4] px-8 py-4 text-xl '>
            Book Now
        </button>


    </form>)
}

export default Reservation