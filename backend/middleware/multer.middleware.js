import multer from 'multer';
import fs from 'fs';
import path from 'path';

const directoryPath = '/tmp/uploads';

if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, directoryPath);
    },
    filename: function (req, file, cb) {
        // Add timestamp to prevent filename conflicts
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

export const upload = multer({
    storage
});