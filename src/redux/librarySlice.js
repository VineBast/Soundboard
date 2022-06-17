import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
    name: "library",
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

export const { add, remove } = librarySlice.actions;
export const librarySelector = (state) => state.library;
export default librarySlice.reducer;