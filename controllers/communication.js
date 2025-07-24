import Communication from '../models/Communication.js';

export const createCommunication = async (req, res) => {
  try {
    const communication = new Communication({
      titre: req.body.titre,
      message: req.body.message,
      date: req.body.date || new Date().toISOString()
    });
    await communication.save();
    res.status(201).json({ message: 'Communication enregistrée !' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getCommunications = (req, res) => {
  Communication.find()
    .then(communications => res.status(200).json(communications))
    .catch(error => res.status(400).json({ error }));
};

export const getOneCommunication = (req, res) => {
  Communication.findOne({ _id: req.params.id })
    .then(communication => res.status(200).json(communication))
    .catch(error => res.status(404).json({ error }));
};

export const modifyCommunication = (req, res) => {
  Communication.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Communication modifiée!' }))
    .catch(error => res.status(400).json({ error }));
};

export const deleteCommunication = (req, res) => {
  Communication.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Communication supprimée !' }))
    .catch(error => res.status(400).json({ error }));
};
