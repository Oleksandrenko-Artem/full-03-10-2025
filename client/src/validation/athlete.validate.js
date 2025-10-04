import * as Yup from 'yup';
import CONSTANTS from '../constants';
import { imageSchema } from './validate';

const nameSchema = Yup.string().trim().min(6).max(255);
const countrySchema = Yup.string().oneOf(CONSTANTS.ALLOWED_COUNTRIES);
const birthYearSchema = Yup.number().min(1900).max(new Date().getFullYear() - 15);

export const createValidationSchema = Yup.object({
    name: nameSchema.required(),
    country: countrySchema.required(),
    birthYear: birthYearSchema.required(),
    sportId: Yup.string().required(),
    avatar: imageSchema,
});

export const updateValidationSchema = Yup.object({
    name: nameSchema,
    country: countrySchema,
    birthYear: birthYearSchema,
    sportId: Yup.string(),
    avatar: imageSchema,
});