export interface Habit {
    id: string,
    title: string,
    description: string,
    points: number
}

export interface HabitsState {
    data: Habit[],
    totalPoints: number
}