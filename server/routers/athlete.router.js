const express = require('express');
const { createAthlete, getAllAthletes, getAthleteById, updateAthleteById, deleteAthleteById } = require('../controllers/athlete.controller');
const upload = require('../middlewares/uploadImage');
const { buildAthleteFilter, validateAthlete } = require('../middlewares/athlete.mw');
const { paginate } = require('../middlewares/pagination.mw');
const { athleteSchemaPost, athleteSchemaPatch } = require('../validations/athlete.validation');

const athleteRouter = express.Router();

athleteRouter.post('/', upload.single('avatar'), validateAthlete(athleteSchemaPost), createAthlete);
athleteRouter.get('/', paginate, buildAthleteFilter, getAllAthletes);
athleteRouter.get('/:idAthlete', getAthleteById);
athleteRouter.patch('/:idAthlete', upload.single('avatar'), validateAthlete(athleteSchemaPatch), updateAthleteById);
athleteRouter.delete('/:idAthlete', deleteAthleteById);

module.exports = athleteRouter;