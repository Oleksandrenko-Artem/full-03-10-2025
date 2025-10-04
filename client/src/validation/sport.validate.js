import * as Yup from 'yup';
import { imageSchema } from './validate';

const nameSchema = Yup.string().trim().matches(/^[A-Z][a-z]{2,63}$/, 'Upper first letter');

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