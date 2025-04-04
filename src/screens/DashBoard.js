import { StyleSheet, View } from "react-native"
import Colors from "../styles/Colors";


const Dashboard = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 20
    }
})


export default Dashboard;