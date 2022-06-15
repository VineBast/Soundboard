import { createSlice } from "@reduxjs/toolkit";

const localSoundsSlice = createSlice({
    name: "localSounds",
    initialState: [],
    reducers: {
        add: (state, action) => {
            let id = state.length;
            return [...state, { sound: action.payload }]
        }
    }
});

export const { add } = localSoundsSlice.actions;
export const soundsSelector = (state) => state.localSounds;
export default localSoundsSlice.reducer;