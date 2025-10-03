import { configureStore } from '@reduxjs/toolkit';
import sportsReducer from './sportsSlice';
import athletesReducer from './athletesSlice';

const store = configureStore({
    reducer: {
        sports: sportsReducer,
        athletes: athletesReducer,
    },
});

export default store;