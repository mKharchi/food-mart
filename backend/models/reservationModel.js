import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    default: null,
  },
  date: {
    type: Date,
    required: true
  }
  , duration: {
    type: Number,
    required: true
  }

}, {
  timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation