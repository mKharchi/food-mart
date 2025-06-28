import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String, // optional: e.g., 'starter', 'main', 'dessert'
  available: { type: Boolean, default: true },
}, { timestamps: true });

const MenuItem  = mongoose.model('MenuItem', MenuItemSchema); 
export default MenuItem