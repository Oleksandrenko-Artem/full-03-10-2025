import { configureStore } from '@reduxjs/toolkit';
import sportsReducer from './sportsSlice';
import athletesReducer from './athletesSlice';
import analiticsReducer from './analiticsSlice';

const store = configureStore({
    reducer: {
        sports: sportsReducer,
        athletes: athletesReducer,
        analitics: analiticsReducer,
    },
});

export default store;