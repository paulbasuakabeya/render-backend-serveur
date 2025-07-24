import Thing from '../models/Thing.js';

export const createThing = (req, res) => {
  const thingObject = req.body.thing ? JSON.parse(req.body.thing) : req.body;
  const thing = new Thing({
    ...thingObject,
    userId: req.userData.userId,
    imageUrl: req.file?.path || thingObject.imageUrl
  });

  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

export const getAllThings = (req, res) => {
  Thing.find()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(400).json({ error }));
};

export const getOneThing = (req, res) => {
  Thing.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(404).json({ error }));
};

export const modifyThing = (req, res) => {
  const thingObject = req.file ? {
    ...JSON.parse(req.body.thing || '{}'),
    imageUrl: req.file.path
  } : { ...req.body };

  Thing.findById(req.params.id)
    .then((thing) => {
      if (thing.userId !== req.userData.userId) {
        return res.status(401).json({ message: 'Non autorisé' });
      }
      Thing.updateOne({ _id: req.params.id }, { ...thingObject })
        .then(() => res.status(200).json({ message: 'Modifié !' }))
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

export const deleteThing = (req, res) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};
