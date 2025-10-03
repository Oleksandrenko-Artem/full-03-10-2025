import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllSports, fetchSportById, fetchCreateSport, fetchDeleteSportById, fetchUpdateSportById } from '../api';
import { pendingCase, rejectedCase } from "./functions";

export const fetchUpdateSportByIdAsync = createAsyncThunk('sports/fetchUpdateSportById', async ({id, formData}, thunkAPI) => {
    try {
        const response = await fetchUpdateSportById({id, formData});
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const fetchDeleteSportByIdAsync = createAsyncThunk('sports/fetchDeleteSportById', async (id, thunkAPI) => {
    try {
        const response = await fetchDeleteSportById(id);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const fetchCreateSportAsync = createAsyncThunk('sports/fetchCreateSport', async (formData, thunkAPI) => {
    try {
        const response = await fetchCreateSport(formData);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const fetchSportByIdAsync = createAsyncThunk('sports/fetchSportById', async (id, thunkAPI) => {
    try {
        const response = await fetchSportById(id);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const fetchAllSportsAsync = createAsyncThunk('sports/fetchAllSports', async (values, thunkAPI) => {
    try {
        const response = await fetchAllSports();
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message);
    }
});

const sportsSlice = createSlice({
    name: 'sports',
    initialState: {
        sports: [],
        selectedSport: null,
        createdSport: null,
        error: null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSportByIdAsync.pending, pendingCase);
        builder.addCase(fetchAllSportsAsync.pending, pendingCase);
        builder.addCase(fetchCreateSportAsync.pending, pendingCase);
        builder.addCase(fetchDeleteSportByIdAsync.pending, pendingCase);
        builder.addCase(fetchUpdateSportByIdAsync.pending, pendingCase);
        builder.addCase(fetchSportByIdAsync.fulfilled, (state, action) => {
            state.selectedSport = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchAllSportsAsync.fulfilled, (state, action) => { 
            state.sports = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchCreateSportAsync.fulfilled, (state, action) => {
            state.createdSport = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchDeleteSportByIdAsync.fulfilled, (state, action) => {
            state.sports = state.sports.filter(((sport) => sport._id !== action.payload._id));
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchUpdateSportByIdAsync.fulfilled, (state, action) => {
            state.selectedSport = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchSportByIdAsync.rejected, rejectedCase);
        builder.addCase(fetchAllSportsAsync.rejected, rejectedCase);
        builder.addCase(fetchCreateSportAsync.rejected, rejectedCase);
        builder.addCase(fetchDeleteSportByIdAsync.rejected, rejectedCase);
        builder.addCase(fetchUpdateSportByIdAsync.rejected, rejectedCase);
    },
});

export default sportsSlice.reducer;