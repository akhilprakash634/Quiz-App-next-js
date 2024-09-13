import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a category description'],
  },
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);