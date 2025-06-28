import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Reservations = ({ token }) => {
  const [reservations, setReservations] = useState([])
   const deleteReservation = async (id) => {
        try {
            const response = await axios.post(
                `${backendUrl}/reservations/delete`,
                { reservationId: id },
                {
                    headers: { token }
                }
            );

            if (response.data.success) {
                toast.success("Reservation cenceled successfully");
                listReservations()
                return true;
            } else {
                toast.error(response.data.message || "Cancel failed");
                return false;
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error.response?.data?.message || "Update failed");
            return false;
        }

    }
  const listReservations = async () => {
    try {
      const response = await axios.post(`${backendUrl}/reservations/`, {}, {
        headers: { token }
      });

      if (response.data.success) {
        setReservations(response.data.reservations);
        console.log(response.data.reservations);
      } else {
        toast.error(response.data.message || "Failed to fetch reservations");
      }
    } catch (error) {
      toast.error(error.message || "Error fetching reservations");
    }
  }

  useEffect(() => {
    listReservations();
  }, [])

  return (
    <div className='flex flex-col items-start justify-start gap-6 p-8'>
      <h1 className='text-3xl sm:text-5xl font-bold'>Reservations</h1>

      <div className='w-full'>
        {reservations.length === 0 ? (
          <p className="text-gray-600">No reservation found.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {reservations.map((res) => (
              <div
                key={res.reservationId}
                className='border relative p-4 rounded-xl shadow bg-white/70 backdrop-blur-sm'
              >
                <span className='absolute text-xl font-semibold right-4 top-3' onClick={()=>{deleteReservation(res.reservationId)}}>X</span>
                <p><strong>Table #:</strong> {res.tableNumber}</p>
                <p><strong>Seats:</strong> {res.numberOfSeats}</p>
                <p><strong>Date:</strong> {new Date(res.date).toLocaleString()}</p>
                <p><strong>ID:</strong> {res.reservationId}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Reservations
