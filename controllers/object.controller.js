import ObjectModel from '../models/Object.js';

export const createObject = (req, res) => {
  const object = new ObjectModel({
    title: req.body.title,
    description: req.body.description,
    owner: req.userData.userId
  });
  object.save()
    .then(() => res.status(201).json({ message: 'Objet créé !' }))
    .catch(error => res.status(400).json({ error }));
};

export const updateObject = (req, res) => {
  ObjectModel.findById(req.params.id)
    .then(object => {
      if (!object) return res.status(404).json({ error: 'Objet introuvable' });

      if (req.userData.role !== 'admin' && object.owner.toString() !== req.userData.userId)
        return res.status(403).json({ error: 'Non autorisé' });

      ObjectModel.updateOne({ _id: req.params.id }, { ...req.body })
        .then(() => res.status(200).json({ message: 'Objet mis à jour !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

export const deleteObject = (req, res) => {
  ObjectModel.findById(req.params.id)
    .then(object => {
      if (!object) return res.status(404).json({ error: 'Objet introuvable' });

      if (req.userData.role !== 'admin' && object.owner.toString() !== req.userData.userId)
        return res.status(403).json({ error: 'Non autorisé' });

      ObjectModel.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
