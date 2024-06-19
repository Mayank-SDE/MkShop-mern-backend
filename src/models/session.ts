import mongoose from 'mongoose';

// Define a Session schema and model
const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export const Session = mongoose.model('Session', sessionSchema);
