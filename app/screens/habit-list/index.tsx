import { fetchHabits, insertHabit } from "@/app/database/HabitDB"
import { RootState } from "@/app/state-manager/store"
import { Habit } from "@/app/types/types"
import { Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"

const HabitList = () => {
    const insertHabitIntoDB = () => {
        const habit: Habit = {
            id: "" + Date.now(),
            title: 'discipline',
            description: 'daily habit',
            points: 110
        }
        try {
            insertHabit(habit)
            console.log("record inserted")
        } catch (e) {
            console.error("error in inserting habit into db", e)
        }
    }
    const fetchHabitsFromDB = () =>{
        fetchHabits().then((habits) => {
            console.log('Fetched habits:', habits);
            // You can use the habits array here
          })
          .catch((error) => {
            console.error('Error fetching habits:', error);
          });
        
    }
    const { data: habits, totalPoints } = useSelector((state: RootState) => state.habits)
    return (
        <View style={{ padding: 16 }}>
            <TouchableOpacity onPress={insertHabitIntoDB} style={{  borderWidth: 1, backgroundColor: 'blue',borderColor: 'black', padding: 16, borderRadius: 4 }}>
                <Text style={{color:'white'}}>Insert Mock Habit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={fetchHabitsFromDB} style={{  borderWidth: 1, backgroundColor: 'blue',borderColor: 'black', padding: 16, borderRadius: 4 }}>
                <Text style={{color:'white'}}>Fetch Habits</Text>
            </TouchableOpacity>
            <Text>Habit List Component {totalPoints}</Text>
        </View>
    )
}
export default HabitList