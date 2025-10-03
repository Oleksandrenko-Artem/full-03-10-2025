const fs = require('fs/promises');
const path = require('path');
const mongoose = require('mongoose');
const Athlete = require('./Athlete');

const sportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 64,
    },
    isOlimpic: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
        default: null,
    },
}, { timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true} });

sportSchema.virtual('athletes', {
    ref: 'Athlete',
    localField: '_id',
    foreignField: 'sportId',
});

sportSchema.post('findOneAndDelete', async (doc) => {
    try {
        if (doc) {
            const athletes = await Athlete.find({ sportId: doc._id }); // array
            for (const athlete of athletes) {
                if (athlete.avatar) {
                    const avatarPath = path.join(__dirname, '..', athlete.avatar);
                    await fs.unlink(avatarPath);
                }
            }
            await Athlete.deleteMany({ sportId: doc._id });
        }
    } catch (error) {
        next(error);
    }
});

const Sport = mongoose.model('Sport', sportSchema);
module.exports = Sport;