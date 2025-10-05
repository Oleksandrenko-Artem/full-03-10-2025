import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAthletesBySport, fetchAthletesByCountry, fetchAvgAgeAthletesBySport, fetchSportsByCountry } from './../api/index';
import { pendingCase, rejectedCase } from './functions';

export const fetchAthletesBySportAsync = createAsyncThunk('analitics/fetchAthletesBySport', async (_, thunkAPI) => {
    try {
        const response = await fetchAthletesBySport();
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

const analiticsSlice = createSlice({
    name: 'analitics',
    initialState: {
        athletesBySport: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAthletesBySportAsync.pending, pendingCase);
        builder.addCase(fetchAthletesBySportAsync.fulfilled, (state, action) => {
            state.athletesBySport = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchAthletesBySportAsync.rejected, rejectedCase);
    },
});

export default analiticsSlice.reducer;