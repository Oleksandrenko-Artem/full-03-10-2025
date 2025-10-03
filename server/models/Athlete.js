const mongoose = require('mongoose');
const CONSTANTS = require('../constants');

const athleteSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: 6,
        maxLength: 255,
        required: true,
    },
    country: {
        type: String,
        enum: CONSTANTS.ALLOWED_COUNTRIES,
        required: true,
    },
    birthYear: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear() - 15,
    },
    sportId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sport',
        required: true,
    },
    avatar: {
        type: String,
        default: null,
    },
}, { timestamps: true });

athleteSchema.index({ name: 1, country: 1, birthYear: 1 }, {unique: true});

const Athlete = mongoose.model('Athlete', athleteSchema);
module.exports = Athlete;