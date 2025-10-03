const express = require('express');
const { countAthletesBySport, countAthletesByCountry, averageAgeAthletesBySport, countSportsByCountry } = require('../controllers/analititcs.controller');

const analiticsRouter = express.Router();

analiticsRouter.get('/amount-athletes-by-sport', countAthletesBySport);
analiticsRouter.get('/amount-athletes-by-country', countAthletesByCountry);
analiticsRouter.get('/average-age-athletes-by-sport', averageAgeAthletesBySport);
analiticsRouter.get('/amount-sports-by-country', countSportsByCountry);

module.exports = analiticsRouter;