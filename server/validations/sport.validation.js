const yup = require('yup');

const sportSchemaCreate = yup.object({
    name: yup.string().trim().matches(/^[A-Z][a-z]{2,63}$/).required(),
    isOlimpic: yup.boolean(),
});

const sportSchemaUpdate = yup.object({
    name: yup.string().trim().matches(/^[A-Z][a-z]{2,63}$/),
    isOlimpic: yup.boolean(),
});

module.exports = { sportSchemaCreate, sportSchemaUpdate };