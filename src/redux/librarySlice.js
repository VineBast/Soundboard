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

//filter the library (and return it) depending of the state.filter
export const filteredSoundsSelector = (state) => {
    switch (state.filter) {
        case 'all':
            return state.library;
        case 'record':
            return state.library.filter((elm) => elm.sound.type === "record");
        case 'freesound':
            return state.library.filter((elm) => elm.sound.type === "freesound");
        default:
            break;
    }
}

export const { addToLibrary, removeFromLibrary } = librarySlice.actions;
export const librarySelector = (state) => state.library;
export default librarySlice.reducer;