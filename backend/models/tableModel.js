import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  category: { type: String, enum: ['indoor', 'outdoor', 'vip'], default: 'indoor' },
  numberOfSeats: { type: Number, required: true },
}, { timestamps: true });

// Virtual field to get all reservations for this table
tableSchema.virtual('reservations', {
  ref: 'Reservation',
  localField: '_id',
  foreignField: 'tableId'
});

// Ensure virtual fields are serialized
tableSchema.set('toJSON', { virtuals: true });
tableSchema.set('toObject', { virtuals: true });

const Table = mongoose.model('Table', tableSchema);

export default Table;