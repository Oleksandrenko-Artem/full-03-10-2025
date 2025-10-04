import * as Yup from 'yup';
import CONSTANTS from '../constants';

export const imageSchema = Yup.mixed().test('fileSize', 'Filesize must be less 5Mb', (value) => {
    return !value || value.size <= CONSTANTS.MAX_FILE_SIZE;
}).test('fileType', "Filetype is'nt supported", (value) => {
    return !value || CONSTANTS.FILE_TYPES.includes(value.type);
});