import { createSlice } from "@reduxjs/toolkit";
import isEmpty from "../../validation/isEmpty";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        update: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !isEmpty(action.payload);
        },
    },
});

export const { update } = userSlice.actions;

export default userSlice.reducer;
