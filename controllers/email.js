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

    let recipientEmails;
    if (recipients === 'all') {
      const users = await User.find();
      recipientEmails = users.map(user => user.email);
    } else if (recipients === 'admins') {
      const admins = await User.find({ role: 'admin' });
      recipientEmails = admins.map(admin => admin.email);
    } else {
      recipientEmails = recipients;
    }

    for (const email of recipientEmails) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message
      });
    }

    res.status(200).json({ message: 'Emails envoyés avec succès !' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
