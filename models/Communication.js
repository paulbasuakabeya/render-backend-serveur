import mongoose from 'mongoose';

const communicationSchema = mongoose.Schema({
  titre: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true }
});

export default mongoose.model('Communication', communicationSchema);
