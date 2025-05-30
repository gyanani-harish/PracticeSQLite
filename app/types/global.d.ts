// global.d.ts (or src/types/global.d.ts)

// Declare the global WebSQL types if they are not picked up by tsconfig.
// This often happens when 'dom' lib isn't fully pulled in or specifically configured.

interface WebSQLDatabase {
    transaction(
      callback: (tx: SQLTransaction) => void,
      errorCallback?: (error: SQLError) => void,
      successCallback?: () => void
    ): void;
    readTransaction(
      callback: (tx: SQLTransaction) => void,
      errorCallback?: (error: SQLError) => void,
      successCallback?: () => void
    ): void;
    // Add other methods if needed, though 'transaction' is the main one for expo-sqlite
    // version: string;
    // changeVersion(oldVersion: string, newVersion: string, callback?: (tx: SQLTransaction) => void, errorCallback?: (error: SQLError) => void, successCallback?: () => void): void;
  }
  
  interface SQLTransaction {
    executeSql(
      sqlStatement: string,
      arguments?: (string | number | null)[],
      callback?: (tx: SQLTransaction, results: SQLResultSet) => void,
      errorCallback?: (tx: SQLTransaction, error: SQLError) => boolean // Returns true if error handled
    ): void;
  }
  
  interface SQLResultSet {
    insertId?: number; // Optional, only for insert operations
    rowsAffected: number;
    rows: SQLResultSetRowList;
  }
  
  interface SQLResultSetRowList {
    length: number;
    item(index: number): any; // Item can be any object
    _array: any[]; // Specific to expo-sqlite, holds the actual array of results
  }
  
  interface SQLError {
    code: number;
    message: string;
  }
  
  // If you're using 'SQLite.openDatabase' then 'SQLite' also needs to be typed.
  // However, 'expo-sqlite' itself usually provides this through its module declaration.
  // If you still get 'Cannot find name 'SQLite'' after this, consider adding:
  declare var SQLite: {
      openDatabase: (
          name: string,
          version?: string,
          displayName?: string,
          estimatedSize?: number,
          creationCallback?: () => void
      ) => WebSQLDatabase;
      // Add other methods if needed, like deleteDatabase etc.
  };