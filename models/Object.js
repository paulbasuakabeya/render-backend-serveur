import mongoose from 'mongoose';

const objectSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Object', objectSchema);
