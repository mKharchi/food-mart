import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddTable from './pages/AddTable'
import Reservations from './pages/Reservations'
import Login from './pages/Login'


import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar'
import Menu from './pages/Menu'


export const backendUrl = import.meta.env.VITE_API_URL
export const currency = import.meta.env.VITE_CURRENCY

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(() => {

    localStorage.setItem('token', token)

  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen '>

      {
        token === "" ? <Login setToken={setToken} /> : <>
          <Navbar setToken={setToken} />
          <hr className='border-gray-400' />
          <div className="flex w-full ">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 txet-base">

              <Routes>
                <Route path='/add' element={<AddTable token={token} />} />
                <Route path='/list' element={<Reservations token={token} />} />
                <Route path='/menu' element={<Menu token={token} />} />

              </Routes>
            </div>

          </div>

        </>
      }
      <ToastContainer />


    </div>
  )
}

export default App
