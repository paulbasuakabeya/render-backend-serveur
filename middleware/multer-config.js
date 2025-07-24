import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype] || path.extname(file.originalname).substring(1);
    callback(null, name + '_' + uuidv4() + '.' + extension);
  },
});

export default multer({ storage }).single('image');
