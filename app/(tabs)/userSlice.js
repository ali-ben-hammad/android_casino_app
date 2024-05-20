import { configureStore, createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        amount: 0
    },
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.amount = action.payload.amount;
        },
        clearUser: (state) => {
            state.name = '';
            state.amount = 0;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user; // select the entire user slice
export const store =  configureStore({
    reducer: {
        user: userSlice.reducer
    }
});
