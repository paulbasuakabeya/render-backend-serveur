import nodemailer from 'nodemailer';
import User from '../models/User.js';

export const sendEmail = async (req, res) => {
  const { subject, message, recipients } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let emails = [];
    if (recipients === 'all') {
      const users = await User.find();
      emails = users.map(user => user.email);
    } else if (recipients === 'admins') {
      const admins = await User.find({ role: 'admin' });
      emails = admins.map(user => user.email);
    } else {
      emails = recipients;
    }

    for (const email of emails) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: message
      });
    }

    res.status(200).json({ message: 'Emails envoyés !' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
