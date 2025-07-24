import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendWelcomeEmail = (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Bienvenue !',
    text: 'Merci pour votre inscription.'
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) console.log('Erreur envoi email:', error);
  });
};

export const signup = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        role: req.body.role || 'user'
      });
      user.save()
        .then(() => {
          sendWelcomeEmail(user.email);
          res.status(201).json({ message: 'Utilisateur créé !' });
        })
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

export const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé !' });

      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect !' });

          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id, role: user.role },
              process.env.JWT_SECRET,
              { expiresIn: '24h' }
            ),
            role: user.role
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

export const getAllUsers = (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
};

export const updateUserRole = (req, res) => {
  User.updateOne({ _id: req.params.id }, { role: req.body.role })
    .then(() => res.status(200).json({ message: 'Rôle mis à jour !' }))
    .catch(error => res.status(400).json({ error }));
};

export const deleteUserEmail = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { email: '' }, { new: true })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      res.status(200).json({ message: 'Email supprimé.', user });
    })
    .catch(error => res.status(500).json({ message: 'Erreur serveur.', error }));
};
