import fs from 'fs';
import multer from 'multer';
import { v4 as uuid } from 'uuid';

const storage = multer.diskStorage({
  destination(request, file, callback) {
    // Generate the destination directory path
    let destinationDirectory = './assets';

    if (!fs.existsSync(destinationDirectory)) {
      fs.mkdirSync(destinationDirectory, { recursive: true });
    }
    callback(null, destinationDirectory);
  },
  filename(request, file, callback) {
    const randomId = uuid();
    const extensionName = file.originalname.split('.').pop();
    const fileName = `MKShop-${randomId}.${extensionName}`;
    callback(null, fileName);
  },
});

export const multipleUpload = multer({ storage }).array('images', 4);

export const singleUpload = multer({ storage }).single('image');
