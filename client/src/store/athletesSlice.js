import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAthleteById, fetchCreateAthlete } from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const fetchCreateAthleteAsync = createAsyncThunk('athletes/fetchCreateAthlete', async (formData, thunkAPI) => {
    try {
        const response = await fetchCreateAthlete(formData);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const fetchAthleteByIdAsync = createAsyncThunk('athletes/fetchAthleteById', async (id, thunkAPI) => {
    try {
        const response = await fetchAthleteById(id);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

const athletesSlice = createSlice({
    name: 'athletes',
    initialState: {
        athletes: [],
        selectedAthlete: null,
        error: null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAthleteByIdAsync.pending, pendingCase);
        builder.addCase(fetchCreateAthleteAsync.pending, pendingCase);
        builder.addCase(fetchAthleteByIdAsync.fulfilled, (state, action) => {
            state.selectedAthlete = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchCreateAthleteAsync.fulfilled, (state, action) => {
            state.selectedAthlete = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchAthleteByIdAsync.rejected, rejectedCase);
        builder.addCase(fetchCreateAthleteAsync.rejected, rejectedCase);
    },
});

export default athletesSlice.reducer;