import { combineReducers, configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./slices/habit-slice";

const rootReducer = combineReducers({
    habits: habitsReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;