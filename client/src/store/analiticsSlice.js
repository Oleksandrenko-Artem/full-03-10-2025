import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAthletesBySport, fetchAthletesByCountry, fetchAvgAgeAthletesBySport, fetchSportsByCountry } from './../api/index';
import { pendingCase, rejectedCase } from './functions';

export const fetchAvgAgeAthletesBySportAsync = createAsyncThunk('analitics/fetchAvgAgeAthletesBySport', async (_, thunkAPI) => {
    try {
        const response = await fetchAvgAgeAthletesBySport();
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const fetchSportsByCountryAsync = createAsyncThunk('analitics/fetchSportsByCountry', async (_, thunkAPI) => {
    try {
        const response = await fetchSportsByCountry();
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const fetchAthletesByCountryAsync = createAsyncThunk('analitics/fetchAthletesByCountry', async (_, thunkAPI) => {
    try {
        const response = await fetchAthletesByCountry();
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

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
        athletesByCountry: [],
        sportsByCountry: [],
        avgAgeAthletesBySport: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAthletesBySportAsync.pending, pendingCase);
        builder.addCase(fetchAthletesByCountryAsync.pending, pendingCase);
        builder.addCase(fetchSportsByCountryAsync.pending, pendingCase);
        builder.addCase(fetchAvgAgeAthletesBySportAsync.pending, pendingCase);
        builder.addCase(fetchAthletesBySportAsync.fulfilled, (state, action) => {
            state.athletesBySport = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchAthletesByCountryAsync.fulfilled, (state, action) => {
            state.athletesByCountry = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchSportsByCountryAsync.fulfilled, (state, action) => {
            state.sportsByCountry = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchAvgAgeAthletesBySportAsync.fulfilled, (state, action) => {
            state.avgAgeAthletesBySport = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchAthletesBySportAsync.rejected, rejectedCase);
        builder.addCase(fetchAthletesByCountryAsync.rejected, rejectedCase);
        builder.addCase(fetchSportsByCountryAsync.rejected, rejectedCase);
        builder.addCase(fetchAvgAgeAthletesBySportAsync.rejected, rejectedCase);
    },
});

export default analiticsSlice.reducer;