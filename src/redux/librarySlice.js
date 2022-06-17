import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
    name: "library",
    initialState: [],
    reducers: {
        addToLibrary: (state, action) => {
            let id = state.length;
            return [...state, { sound: action.payload }]
        },
        removeFromLibrary: (state, action) => {
            return state.filter((elm) => elm.sound.id != action.payload);
        }
    }
});

export const { addToLibrary, removeFromLibrary } = librarySlice.actions;
export const librarySelector = (state) => state.library;
export default librarySlice.reducer;