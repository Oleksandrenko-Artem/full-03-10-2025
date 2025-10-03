const multer = require('multer');
const CONSTANTS = require('../constants');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, CONSTANTS.UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        const uniqFileName = Date.now() + '-' + file.originalname
        cb(null, uniqFileName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /png|jpg|jpeg|webp|ico/;
    const isRightType = allowedTypes.test(file.mimetype);
    if (isRightType) {
        cb(null, true);
    } else {
        cb(new Error('wrong mimetype'));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: CONSTANTS.MAX_UPLOAD_SIZE }, // 5Mb
    fileFilter
});

module.exports = upload;