import multer from 'multer';
import fs from 'fs';
import path from 'path';


const directoryPath = path.resolve('public/temp');


if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, directoryPath); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({
    storage,
});
