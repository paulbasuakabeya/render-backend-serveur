import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'user'
    });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé !' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: 'Identifiant incorrect !' });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect !' });

    res.status(200).json({
      userId: user._id,
      role: user.role,
      token: jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      )
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getAllUsers = (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({ error }));
};
