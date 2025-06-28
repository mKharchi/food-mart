import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'
import { assets } from '../assets/asset'

const AddTable = ({ token }) => {
  const [tables, setTables] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    number: '',
    numberOfSeats: '',
    category: ''
  })

  const listTables = async () => {
    try {
      const response = await axios.post(`${backendUrl}/tables/list`, {}, {
        headers: { token }
      })

      if (response.data.success) {
        setTables(response.data.tables)
      } else {
        toast.error(response.data.message || "Failed to fetch tables")
      }
    } catch (error) {
      toast.error(error.message || "Error fetching tables")
    }
  }

  const handleAdd = async () => {
    const { number, numberOfSeats, category } = form;

    if (!number || !numberOfSeats || !category) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/tables/add`, {
        number: Number(number),
        numberOfSeats: Number(numberOfSeats),
        category
      }, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success("Table added successfully");
        setShowForm(false);
        setForm({ number: '', numberOfSeats: '', category: '' });
        listTables();
      } else {
        toast.error(response.data.message || "Failed to add table");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to add table");
    }
  }

  useEffect(() => {
    listTables()
  }, [])

  return (
    <div className='flex flex-col items-start justify-start gap-6 p-8'>
      <h1 className='text-3xl sm:text-5xl font-bold'>Add Table</h1>

      <div className='w-full'>
        <h2 className='text-xl font-semibold mb-2'>Existing Tables</h2>
        {tables.length === 0 ? (
          <p className="text-gray-600">No tables found.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {tables.map((table) => (
              <div
                key={table._id}
                className='border p-4 rounded-xl shadow bg-white/70 backdrop-blur-sm'
              >
                <p><strong>Table #:</strong> {table.number}</p>
                <p><strong>Category:</strong> {table.category}</p>
                <p><strong>Seats:</strong> {table.numberOfSeats}</p>
                <p><strong>Status:</strong> {table.reservationId ? "Reserved" : "Available"}</p>
              </div>
            ))}
            <div
              onClick={() => setShowForm(true)}
              className='flex justify-center items-center border p-4 rounded-xl shadow bg-white/70 backdrop-blur-sm cursor-pointer'
            >
              <img src={assets.add_icon} className='w-12 h-12' alt="Add" />
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <div className='mt-6 w-full max-w-md border p-4 rounded-xl shadow bg-white/80'>
          <h3 className='text-2xl font-semibold mb-4'>New Table</h3>
          <div className='flex flex-col gap-3'>
            <input
              type="number"
              placeholder="Table Number"
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
              className='p-2 border rounded'
            />
            <input
              type="number"
              placeholder="Number of Seats"
              value={form.numberOfSeats}
              onChange={(e) => setForm({ ...form, numberOfSeats: e.target.value })}
              className='p-2 border rounded'
            />
            <select className='p-2 border rounded' onChange={(e)=>setForm({...form , category:e.target.value})} name="" id="" value={form.category}>
              <option value="indoor">indoor</option>
              <option value="outdoor">outdoor</option>
              <option value="vip">vip</option>
            </select>

            <div className='flex gap-4 mt-4'>
              <button
                onClick={handleAdd}
                className='flex-1 p-2 bg-black text-white rounded'
              >
                Add Table
              </button>
              <button
                onClick={() => setShowForm(false)}
                className='flex-1 p-2 border rounded'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddTable
