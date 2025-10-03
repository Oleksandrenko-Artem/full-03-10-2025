import * as Yup from 'yup';
import CONSTANTS from '../constants';

const nameSchema = Yup.string().trim().matches(/^[A-Z][a-z]{2,63}$/, 'Upper first letter');
const imageSchema = Yup.mixed().test('fileSize', 'Filesize must be less 5Mb', (value) => {
    return !value || value.size <= CONSTANTS.MAX_FILE_SIZE;
}).test('fileType', "Filetype is'nt supported", (value) => {
    return !value || CONSTANTS.FILE_TYPES.includes(value.type);
});

export const createValidationSchema = Yup.object({
    name: nameSchema.required(),
    isOlimpic: Yup.boolean(),
    image: imageSchema,
});

export const updateValidationSchema = Yup.object({
    name: nameSchema,
    isOlimpic: Yup.boolean(),
    image: imageSchema,
});