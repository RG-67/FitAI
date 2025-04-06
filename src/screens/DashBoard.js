import { StyleSheet, View, Image, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"
import Colors from "../styles/Colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
    const navigation = useNavigation();
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? "height" : "padding"} style={styles.mainContainer}>
            <View>
                <View style={styles.header}>
                    <Image source={require('../asset/male.png')} style={styles.userImg} />
                    <Text style={styles.userText}>Hello, User 👋</Text>
                    <Icon name="notifications" size={30} style={styles.ntIcon} />
                </View>

                <View style={styles.itemContainer}>

                </View>

            </View>

            <TouchableOpacity style={styles.chatBtn} onPress={() => navigation.navigate('ChatScreen')}>
                <Image source={require('../asset/male_coach.png')} style={styles.chatImg} />
            </TouchableOpacity>

        </KeyboardAvoidingView>
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
    },
    userImg: {
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: Colors.lightPurple
    },
    userText: {
        fontSize: 18,
        color: Colors.black,
        fontWeight: '600',
        alignSelf: 'center'
    },
    ntIcon: {
        borderRadius: 50,
        width: 40,
        height: 40,
        backgroundColor: Colors.lightPurple,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: Colors.yellow
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    chatBtn: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.maroon,
        elevation: 5,
        backgroundColor: Colors.lightMaroon
    },
    chatImg: {
        width: 30,
        height: 30
    }
});


export default Dashboard;