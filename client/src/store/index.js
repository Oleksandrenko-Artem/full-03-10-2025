import { configureStore } from '@reduxjs/toolkit';
import sportsReducer from './sportsSlice';

const store = configureStore({
    reducer: {
        sports: sportsReducer,
    },
});

export default store;