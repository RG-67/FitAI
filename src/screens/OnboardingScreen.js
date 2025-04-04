import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Colors from "../styles/Colors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearProgressBar } from "../components/LinearProgressBar";


const OnBoarding = () => {

    const navigation = useNavigation();
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [percentage, setPercentage] = useState(20);
    const [visible, setVisible] = useState(1);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [isMale, setIsMale] = useState(false);
    const [isFemale, setIsFemale] = useState(false);

    const handleClick = () => {
        setVisible(preVisible => {
            if (preVisible < 5) return preVisible + 1;
            else {
                AsyncStorage.setItem("CompleteOnBoard", "true");
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }]
                });
            }
        });
        setPercentage(prevPercentage => prevPercentage + 20);
    }

    return (
        <KeyboardAvoidingView style={styles.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <LinearProgressBar
                percentage={percentage} />
            <Text style={styles.heading}>Let’s Get Moving!</Text>
            <Text style={styles.subHeading}>Tell us a bit about yourself to personalize your fitness journey.</Text>
            {/* Personal details */}
            
                {visible === 1 ? (
                    <View style={{marginTop: 80}}>
                        <TextInput
                            placeholder="First name"
                            style={styles.nameInput}
                            value={name}
                            onChangeText={setName}
                            keyboardType="default"
                        />
                        <TextInput
                            placeholder="Last name"
                            style={styles.nameInput}
                            value={lastName}
                            onChangeText={setLastName}
                            keyboardType="default"
                        />
                        <TextInput
                            placeholder="Email"
                            style={styles.nameInput}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>
                ) : visible === 2 ? (
                    <View style={styles.prDetails}>
                        {/* Gender */}
                        <Text style={{ ...styles.textStyle, marginBottom: 20 }}>Select gender?</Text>
                        <View style={styles.genderBtn}>
                            <TouchableOpacity style={{ ...styles.radioBtnStyle, marginEnd: 5 }}>
                                <Image source={require('../asset/male.png')} style={styles.imgStyle} />
                                <Text style={styles.genderText}>Male</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.radioBtnStyle, marginStart: 5 }}>
                                <Image source={require('../asset/woman.png')} style={styles.imgStyle} />
                                <Text style={styles.genderText}>Female</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : visible === 3 ? (
                    <View style={styles.prDetails}>
                        {/* Age */}
                        <Text style={{ ...styles.textStyle, marginBottom: 20, alignSelf: 'center' }}>Age?</Text>
                        <TextInput
                            value={age}
                            keyboardType="numeric"
                            onChangeText={setAge}
                            style={styles.ageInput}
                        />
                    </View>
                ) : visible === 4 ? (
                    <View style={styles.prDetails}>
                        {/* Height */}
                        <Text style={{ ...styles.textStyle, marginBottom: 20, alignSelf: 'center' }}>Height (meter)?</Text>
                        <TextInput
                            value={height}
                            keyboardType="decimal-pad"
                            onChangeText={setHeight}
                            style={styles.heightInput}
                        />
                    </View>
                ) : (
                    <View style={styles.prDetails}>
                    {/* Weight */}
                    <Text style={{ ...styles.textStyle, marginBottom: 20, alignSelf: 'center' }}>Weight (Kg)?</Text>
                        <TextInput
                            value={weight}
                            keyboardType="decimal-pad"
                            onChangeText={setWeight}
                            style={styles.weightInput}
                        />
                    </View>
                )}

                <TouchableOpacity style={styles.continueBtn} onPress={() => handleClick()}>
                    <Text style={styles.continueBtnText}>Continue</Text>
                </TouchableOpacity>


        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 20
    },
    heading: {
        marginHorizontal: 10,
        marginBottom: 5,
        marginTop: 20,
        fontWeight: '600',
        fontSize: 20,
        color: Colors.black,
        fontFamily: 'Poppins-Bold'
    },
    subHeading: {
        marginHorizontal: 10,
        fontWeight: '400',
        fontSize: 16,
        color: Colors.gray,
        fontFamily: 'Poppins-Regular'
    },
    radioBtnStyle: {
        height: 150,
        width: 150,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.purple,
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 18,
        color: Colors.black,
        fontWeight: '500',
        marginHorizontal: 10
    },
    imgStyle: {
        alignSelf: 'center'
    },
    genderText: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 15,
        fontWeight: '600',
        color: Colors.black
    },
    prDetails: {
        flex: 1,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    genderBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    continueBtn: {
        height: 50,
        width: 150,
        backgroundColor: Colors.yellow,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 20
    },
    continueBtnText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.black
    },
    ageInput: {
        width: 100,
        alignSelf: 'center',
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        padding: 10,
        fontSize: 20,
        color: Colors.black,
        fontWeight: '500',
        textAlign: 'center'
    },
    heightInput: {
        width: 120,
        alignSelf: 'center',
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        padding: 10,
        fontSize: 20,
        color: Colors.black,
        fontWeight: '500',
        textAlign: 'center'
    },
    weightInput: {
        width: 120,
        alignSelf: 'center',
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        padding: 10,
        fontSize: 20,
        color: Colors.black,
        fontWeight: '500',
        textAlign: 'center'
    },
    nameInput: {
        alignSelf: 'center',
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        padding: 10,
        fontSize: 15,
        color: Colors.black,
        fontWeight: '500',
        marginHorizontal: 10,
        marginBottom: 10,
        width: 250
    }

})


export default OnBoarding;