import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import userRoutes from './routes/user.js';
import thingRoutes from './routes/thing.js';
import communicationRoutes from './routes/communication.js';
import objectRoutes from './routes/object.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/things', thingRoutes);
app.use('/api/communications', communicationRoutes);
app.use('/api/objects', objectRoutes);

// Route GET pour la racine "/"
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API Express !');
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connexion à MongoDB réussie !');
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Serveur lancé sur le port ${port}`));
})
.catch(error => console.error('Erreur de connexion à MongoDB :', error));
