import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Token non fourni');

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { userId: decodedToken.userId, role: decodedToken.role };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Requête non authentifiée : ' + error.message });
  }
};
