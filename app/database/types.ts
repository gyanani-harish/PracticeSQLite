
export interface SQLiteDatabase {
    transaction: (
        callback: (tx: SQLTransaction) => void,
        errorCallback?: (error: SQLError) => void,
        successCallback?: () => void
    ) => void;
}

