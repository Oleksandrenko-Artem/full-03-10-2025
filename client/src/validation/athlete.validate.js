import * as Yup from 'yup';
import CONSTANTS from '../constants';
import { imageSchema } from './validate';

export const createValidationSchema = Yup.object({
    name: Yup.string().trim().min(6).max(255).required(),
    country: Yup.string().oneOf(CONSTANTS.ALLOWED_COUNTRIES).required(),
    birthYear: Yup.number().min(1900).max(new Date().getFullYear() - 15).required(),
    sportId: Yup.string().required(),
    avatar: imageSchema,
});