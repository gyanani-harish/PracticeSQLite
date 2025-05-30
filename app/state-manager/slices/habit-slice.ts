import { Habit, HabitsState } from "@/app/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: HabitsState = {
    data: [],
    totalPoints: 111
}

const habitSlice = createSlice({
    name: 'HabitSlice',
    initialState: initialState,
    reducers: {
        addHabit(state, action: PayloadAction<Habit>){
            state.data.push(action.payload)
        }
    }
})

export const { addHabit } = habitSlice.actions
export default habitSlice.reducer