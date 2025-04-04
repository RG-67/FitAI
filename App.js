import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "./src/styles/Colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnBoarding from "./src/screens/OnboardingScreen";
import Dashboard from "./src/screens/DashBoard";
import ChatScreen from "./src/screens/ChatScreen";


const Stack = createNativeStackNavigator();

const App = () => {
    const [isComplete, setComplete] = useState(null);
    useEffect(() => {
        const checkComplete = async () => {
            try {
                const checkCm = await AsyncStorage.getItem("CompleteOnBoard");
                console.log("Check ==>", checkCm);
                if (checkCm === "true") setComplete(true);
                else setComplete(false);
            } catch (error) {
                console.error("CheckCompleteError ==>", error);
                setComplete(false);
            }
        }
        checkComplete();
    }, []);

    if (isComplete === null) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isComplete ? "Dashboard" : "OnBoarding"} screenOptions={{ headerShown: false, statusBarBackgroundColor: Colors.navy }}>
                <Stack.Screen name="OnBoarding" component={OnBoarding} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default App;