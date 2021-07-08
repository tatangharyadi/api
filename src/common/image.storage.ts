import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validMimeTypes: validMimeType[] = [
    'image/png',
    'image/jpg',
    'image/jpeg',
];

export const saveImageDisk = {
    storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
            const fileName = `${uuidv4()}${extname(file.originalname)}`;
            callback(null, fileName);
        },
    }),
    fileFilter: (_, file, callback) => {
        const allowedMimeTypes: validMimeType[] = validMimeTypes;
        allowedMimeTypes.includes(file.mimetype)
            ? callback(null, true)
            : callback(null, false);
    },
};
