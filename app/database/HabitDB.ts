import { Habit } from "../types/types";
import { getDatabase } from "./database";

export const insertHabit = async (habit: Habit): Promise<void> => {
    await getDatabase().runAsync('INSERT INTO habits (id, title, description, points) VALUES (?, ?, ?, ?);', [habit.id, habit.title, habit.description, habit.points]);
};

export const fetchHabits = async (): Promise<{ id: string; title: string;  description: string, points: number }[]> => {
    const result = await getDatabase().getAllAsync<{ id: string; title: string; description: string, points: number }>(
      'SELECT * FROM habits;'
    );
    console.log('internal fetchHabits result=', result)
    return result;
  };

// Example for addHabitToDb
// export const addHabitToDb = (habit: Habit): Promise<void> => {
//     return new Promise((resolve, reject) => {
//         getDatabase().execAsync(
//             (tx: SQLTransaction) => { // Apply type here
//                 tx.executeSql(
//                     `INSERT INTO habits (id, name, description, points) VALUES (?, ?, ?, ?);`,
//                     [habit.id, habit.title, habit.description, habit.points],
//                     () => {
//                         console.log('Habit added to DB:', habit.title);
//                         resolve();
//                     },
//                     (_, error: SQLError) => { // Apply type here
//                         console.error('Error adding habit to DB:', error);
//                         reject(error);
//                         return true;
//                     }
//                 );
//             },
//             (error: SQLError) => { // Apply type here
//                 console.error('Transaction error adding habit:', error);
//                 reject(error);
//             }
//         );
//     });
// };