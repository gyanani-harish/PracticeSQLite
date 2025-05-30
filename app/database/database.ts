import * as SQLite from 'expo-sqlite'; // <-- Import from '/next' for async methods
// Define the database object globally or pass it around
let db: SQLite.SQLiteDatabase | null = null; // Use WebSQLDatabase type directly

// Function to get the database instance
export const getDatabase = (): SQLite.SQLiteDatabase => {
    if (!db) {
        // You should ideally call openDatabaseAsync only once and wait for it
        // This function assumes initDb has already set 'db'
        throw new Error("Database not initialized. Call initDb() first.");
    }
    return db;
};
// Function to initialize the database (create tables)
export const initDb = async (): Promise<void> => { // Make this function async
    try {
        // Use openDatabaseAsync and await its result
        db = await SQLite.openDatabaseAsync('habits.db'); // <-- Use openDatabaseAsync

        await db.execAsync( // <-- Use transactionAsync and await it
            
                `CREATE TABLE IF NOT EXISTS habits (
                    id TEXT PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    description TEXT NOT NULL,
                    points INTEGER NOT NULL
                );`
            );
        console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error; // Re-throw to be caught by App.tsx
    }
};
// Function to initialize the database (create tables)
// export const initDbOld = (): Promise<void> => {
//     return new Promise((resolve, reject) => {
//         db = SQLite.openDatabaseSync('habits.db');

//         db.withTransactionSync(
//             (tx: SQLTransaction) => { // Use SQLTransaction type directly
//                 tx.executeSql(
//                     `CREATE TABLE IF NOT EXISTS habits (
//                         id TEXT PRIMARY KEY NOT NULL,
//                         title TEXT NOT NULL,
//                         description TEXT,
//                         points INTEGER NOT NULL
//                     );`,
//                     [],
//                     () => {
//                         console.log('Habits table created/checked successfully');
//                         resolve();
//                     },
//                     (_, error: SQLError) => { // Use SQLError type directly
//                         console.error('Error creating habits table:', error);
//                         reject(error);
//                         return true;
//                     }
//                 );
//             },
//             (error: SQLError) => { // Use SQLError type directly
//                 console.error('Transaction error during DB init:', error);
//                 reject(error);
//             },
//             () => {
//                 console.log('Database initialized successfully.');
//             }
//         );
//     });
// };