
export const pendingCase = (state) => {
    state.error = null;
    state.isLoading = true;
};

export const rejectedCase = (state, action) => {
    state.error = action.payload;
    state.isLoading = false;
};