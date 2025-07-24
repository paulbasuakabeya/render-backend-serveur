import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['user', 'agent', 'admin'],
    default: 'user',
  }
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
