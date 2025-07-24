import Thing from '../models/Thing.js';

export const createThing = (req, res) => {
  const thingObject = req.body.thing ? JSON.parse(req.body.thing) : {};
  delete thingObject._id;
  delete thingObject._userId;
  const thing = new Thing({
    ...thingObject,
    userId: req.userData.userId,
    imageUrl: req.file ? req.file.path : thingObject.imageUrl,
    date: new Date().toISOString()
  });

  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

export const getOneThing = (req, res) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

export const modifyThing = (req, res) => {
  const thingObject = req.file
    ? { ...JSON.parse(req.body.thing || '{}'), imageUrl: req.file.path }
    : { ...req.body };
  delete thingObject._userId;

  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      if (thing.userId !== req.userData.userId) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié!' }))
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

export const deleteThing = (req, res) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};

// ✅ Cette fonction est renommée ici pour correspondre à ton import dans routes/thing.js
export const getThings = (req, res) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};
