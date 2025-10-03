const createError = require('http-errors');

module.exports.validateSportBody = (sportSchema) => async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return next(createError(400, 'Empty data'));
        }
        req.body = await sportSchema.validate(req.body);
        next();
    } catch (error) {
        next(createError(400, error.message));
    }
};

module.exports.buildSportFilter = async (req, res, next) => {
    try {
        const { name, olimpic, image } = req.query;
        req.filter = {};
        if (name) {
            req.filter.name = new RegExp(name);
        }
        if (olimpic) {
            req.filter.isOlimpic = olimpic === 'yes';
        }
        if (image) {
            req.filter.image = image === 'no' ? null : new RegExp('');
        }
        next();
    } catch (error) {
        next(error);
    }
};