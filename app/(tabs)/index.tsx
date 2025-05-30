import { Alert, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { initDb } from '../database/database';
import HabitList from '../screens/habit-list';
import { store } from '../state-manager/store';

export default function HomeScreen() {
  // Initialize DB on app mount
  useEffect(() => {
    const initializeAndLoadData = async () => {
        try {
            await initDb(); // Initialize the database (create tables)
            // After DB init, fetch existing data and set it in Redux
            //const storedHabits = await getHabitsFromDb();
            // You might need to calculate totalPoints from storedHabits if not stored directly
            // const totalPoints = storedHabits.reduce((sum, habit) => {
            //     // Only add points if habit was completed (and if you want to store total points in DB)
            //     // For now, we'll let Redux calculate totalPoints on its own by fetching habits
            //     return sum;
            // }, 0);

            // store.dispatch(setHabits({ list: storedHabits, totalPoints: totalPoints })); // Set habits in Redux
            // setDbInitialized(true); // Mark DB as initialized
        } catch (error) {
            console.error('Failed to initialize database or load data:', error);
            Alert.alert('Database Error', 'Failed to load app data. Please restart the app.');
        }
    };

    initializeAndLoadData();
}, []); // Run once on mount

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, backgroundColor: 'grey', paddingTop: StatusBar.currentHeight ?? 10 }}>
          <HabitList />
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
