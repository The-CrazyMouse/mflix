// models/session.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  user_id: String, // refers to User.email
  jwt: String,
});

export default mongoose.model('Session', sessionSchema);

