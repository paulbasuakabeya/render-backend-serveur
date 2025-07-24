import Communication from '../models/Communication.js';

export const createCommunication = (req, res) => {
  const communication = new Communication({ ...req.body });
  communication.save()
    .then(() => res.status(201).json({ message: 'Communication enregistrée !' }))
    .catch(error => res.status(400).json({ error }));
};

export const getAllCommunications = (req, res) => {
  Communication.find()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(400).json({ error }));
};

export const getOneCommunication = (req, res) => {
  Communication.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(404).json({ error }));
};

export const modifyCommunication = (req, res) => {
  Communication.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => res.status(200).json({ message: 'Communication modifiée !' }))
    .catch(error => res.status(400).json({ error }));
};

export const deleteCommunication = (req, res) => {
  Communication.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Supprimée !' }))
    .catch(error => res.status(400).json({ error }));
};
