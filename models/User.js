import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  weeklyScore: {
    type: Number,
    default: 0,
  },
  lastScoreUpdate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);