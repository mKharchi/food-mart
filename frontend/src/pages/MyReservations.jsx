import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import Hero from '../components/Hero';
import { toast } from 'react-toastify';

const MyReservationsSection = () => {
  const {
    setDate,
    date,
    persons,
    setPersons,
    stamps,
    getStamps,
    reservations,
    cancelReservations,
    UpdateReservations,
  } = useAuth();

  const [editingId, setEditingId] = useState(null);
  const [cancelId, setCancelId] = useState(null);
  const [payload, setPayload] = useState({
    newdate: '',
    newStamp: '',
    numberOfPeople: ''
  });

  // Automatically fetch time slots when date + number of people change during update
  useEffect(() => {
    if (editingId && payload.newdate && payload.numberOfPeople) {
      getStamps(payload.newdate, payload.numberOfPeople);
    }
  }, [payload.newdate, payload.numberOfPeople, editingId]);

  // Prefill data when editing starts
  useEffect(() => {
    if (!editingId) return;

    const reservation = reservations.find(r => r.reservationId === editingId);
    if (reservation) {
      const dateOnly = reservation.date.split("T")[0];
      setPayload({
        newdate: dateOnly,
        newStamp: "", // or prefill with `${new Date(reservation.date).getHours()}:00`
        numberOfPeople: reservation.numberOfSeats
      });
    }
  }, [editingId, reservations]);

  const handleUpdate = async (reservationId) => {
    if (!payload.newdate || !payload.newStamp || !payload.numberOfPeople) {
      alert("All fields are required.");
      return;
    }

    const [hours, minutes] = payload.newStamp.split(":").map(Number);
    const updatedDate = new Date(payload.newdate);
    updatedDate.setHours(hours, minutes || 0, 0, 0);

    const success = await UpdateReservations({
      reservationId,
      date: updatedDate.toISOString(),
      numberOfSeats: Number(payload.numberOfPeople),
    });

    if (success) {
      setEditingId(null);
      setPayload({ newdate: "", newStamp: "", numberOfPeople: "" });
    }
  };

  const handleCancel = async (id) => {
    alert("Are you sure you want to cancel your reservation")
    await cancelReservations(id);
  }


  return (
    <section className='flex flex-col justify-start gap-10 items-center min-h-screen w-full p-8 sm:px-32 sm:py-16 px-16 py-8'>
      <h2 className="text-3xl xl:text-5xl font-bold text-center mt-8">My Reservations</h2>

      {(!reservations || reservations.length === 0) ? (
        <div className="text-center text-gray-600">
          You have no reservations yet.
        </div>
      ) : (
        <div className="w-full lg:w-2/3 text-lg mx-auto flex flex-col justify-center gap-6 items-center">
          {reservations.map((res) => (
            <div
              key={res.reservationId}
              className="flex flex-col w-full gap-4 border border-gray-300 shadow-md rounded-xl p-6 bg-white/60 backdrop-blur-sm"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="w-full flex flex-col gap-1">
                  <p><span className="font-semibold">Date:</span> {new Date(res.date).toLocaleString()}</p>
                  <p><span className="font-semibold">Duration:</span> {res.duration} hour(s)</p>
                </div>

                <div className="w-full flex flex-col gap-1 items-center md:items-end">
                  <p><span className="font-semibold">Table Number:</span> {res.tableNumber}</p>
                  <p><span className="font-semibold">Seats:</span> {res.numberOfSeats}</p>
                </div>

                <div className="w-full flex flex-col gap-2 items-center md:items-end">
                  <button
                    onClick={() => handleCancel(res.reservationId)}
                    className='w-full md:w-32 p-2 bg-black text-white text-xl'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setEditingId(res.reservationId)}
                    className='w-full md:w-32 p-2 border text-xl'
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Update form */}
              {editingId === res.reservationId && (
                <div className="flex flex-col gap-4 mt-4 w-full border-t relative pt-4">
                  <span
                    onClick={() => setEditingId(null)}
                    className='absolute cursor-pointer top-1 right-1 text-xl font-semibold'
                  >
                    ✕
                  </span>

                  <label className='text-lg font-medium'>New Date:</label>
                  <input
                    type="date"
                    value={payload.newdate}
                    onChange={(e) => setPayload({ ...payload, newdate: e.target.value })}
                    className="p-2 border rounded"
                  />

                  <label className='text-lg font-medium'>New Time Slot:</label>
                  <select
                    value={payload.newStamp}
                    onChange={(e) => setPayload({ ...payload, newStamp: e.target.value })}
                    className="p-2 border rounded"
                  >
                    <option value="">Select time slot</option>
                    {stamps.map((slot, idx) => (
                      <option key={idx} value={slot}>{slot}</option>
                    ))}
                  </select>

                  <label className='text-lg font-medium'>Number of People:</label>
                  <input
                    type="number"
                    min={1}
                    value={payload.numberOfPeople}
                    onChange={(e) => setPayload({ ...payload, numberOfPeople: e.target.value })}
                    className="p-2 border rounded"
                  />

                  <button
                    onClick={() => handleUpdate(res.reservationId)}
                    className="w-full p-3 bg-green-600 text-white font-semibold mt-2"
                  >
                    Confirm Update
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const MyReservations = () => {
  return (
    <div>
      <Hero
        description=""
        image="reservationsPage.png"
        title="View your reservations"
      />
      <MyReservationsSection />
    </div>
  );
};

export default MyReservations;
