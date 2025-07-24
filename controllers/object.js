import ObjectModel from '../models/Object.js';

export const createObject = (req, res) => {
  const object = new ObjectModel({
    title: req.body.title,
    description: req.body.description,
    owner: req.userData.userId
  });
  object.save()
    .then(() => res.status(201).json({ message: 'Object created successfully!' }))
    .catch(error => res.status(400).json({ error }));
};

export const getObjects = (req, res) => {
  ObjectModel.find()
    .then(objects => res.status(200).json(objects))
    .catch(error => res.status(400).json({ error }));
};

export const updateObject = (req, res) => {
  ObjectModel.findById(req.params.id)
    .then(object => {
      if (!object) return res.status(404).json({ error: 'Object not found!' });
      if (req.userData.role !== 'admin' && object.owner.toString() !== req.userData.userId) {
        return res.status(403).json({ error: 'Not authorized to modify this object!' });
      }
      ObjectModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Object updated successfully!' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

export const deleteObject = (req, res) => {
  ObjectModel.findById(req.params.id)
    .then(object => {
      if (!object) return res.status(404).json({ error: 'Object not found!' });
      if (req.userData.role !== 'admin' && object.owner.toString() !== req.userData.userId) {
        return res.status(403).json({ error: 'Not authorized to delete this object!' });
      }
      ObjectModel.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Object deleted successfully!' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
