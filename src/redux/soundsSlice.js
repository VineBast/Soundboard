import { createSlice } from "@reduxjs/toolkit";

const soundsSlice = createSlice({
    name: "sounds",
    initialState: [],
    reducers: {
        add: (state, action) => {
            let id = state.length;
            return [...state, { sound: action.payload }]
        },
        remove: (state, action) => {
            return state.filter((elm) => elm.sound.id != action.payload);
        }
    }
});

export const { add, remove } = soundsSlice.actions;
export const soundsSelector = (state) => state.sounds;
export default soundsSlice.reducer;