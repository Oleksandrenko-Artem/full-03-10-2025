import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAthleteById, fetchCreateAthlete, fetchUpdateAthleteById, fetchDeleteAthleteById } from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const fetchDeleteAthleteByIdAsync = createAsyncThunk('athletes/fetchDeleteAthleteById', async (id, thunkAPI) => {
    try {
        const response = await fetchDeleteAthleteById(id);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const fetchUpdateAthleteByIdAsync = createAsyncThunk('athletes/fetchUpdateAthleteById', async ({ id, formData }, thunkAPI) => {
    try {
        const response = await fetchUpdateAthleteById({ id, formData });
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

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

const fulfilledCase = (state, action) => {
    state.selectedAthlete = action.payload;
    state.isLoading = false;
    state.error = null;
};

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
        builder.addCase(fetchUpdateAthleteByIdAsync.pending, pendingCase);
        builder.addCase(fetchDeleteAthleteByIdAsync.pending, pendingCase);
        builder.addCase(fetchAthleteByIdAsync.fulfilled, fulfilledCase);
        builder.addCase(fetchCreateAthleteAsync.fulfilled, fulfilledCase);
        builder.addCase(fetchUpdateAthleteByIdAsync.fulfilled, fulfilledCase);
        builder.addCase(fetchDeleteAthleteByIdAsync.fulfilled, (state, action) => {
            state.athletes = state.athletes.filter(((athlete) => athlete._id !== action.payload._id));
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchAthleteByIdAsync.rejected, rejectedCase);
        builder.addCase(fetchCreateAthleteAsync.rejected, rejectedCase);
        builder.addCase(fetchUpdateAthleteByIdAsync.rejected, rejectedCase);
        builder.addCase(fetchDeleteAthleteByIdAsync.rejected, rejectedCase);
    },
});

export default athletesSlice.reducer;