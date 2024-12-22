import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Specify the path relative to where your server is running
const directoryPath = path.resolve('public/temp');

// Create the directory if it doesn't exist
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
