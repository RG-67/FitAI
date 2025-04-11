import { StyleSheet, View, Text, Image, Pressable, ImageBackground, FlatList, TextInput, Button, TouchableOpacity, Platform, PermissionsAndroid } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../styles/Colors";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import { useState } from "react";
import axios from "axios";


const ChatScreen = () => {
    const navigation = useNavigation();
    const [text, setText] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [messages, setMessages] = useState([]);

    const requestPermission = async () => {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES || PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: "Permission required",
              message: "App needs access to your photos",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
      };

    const handleSend = async () => {
        if (!text && !imageUri) return;
    
        console.log("Text:", text);
        console.log("Image URI:", imageUri);
        const formData = new FormData();
        if (text) formData.append("prompt", text);
        if (imageUri) {
          const uri = Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''); 
          formData.append("image", {
            uri: uri,
            name: "photo.jpg",
            type: "image/jpeg",
          });
        }

        console.log("Form data:", formData);
    
        try {
          const response = await axios.post("http://192.168.0.104:5000/api/v1/imagePrompt", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
    
          const data = response.data;
    
          setMessages(prev => [
            ...prev,
            { type: "user", text, imageUri },
            { type: "bot", text: data.message }
          ]);
    
          setText("");
          setImageUri(null);
        } catch (err) {
          console.error("Upload error:", err);
        }
      };

      const pickImage = async () => {
        // const hasPermission = await requestPermission();
        // if (!hasPermission) return;

        const options = {
            mediaType: 'photo',
            selectionLimit: 1,
            includeBase64: false
        }

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("Image picker error:", response.error);
            } else {
              const uri = response.assets[0].uri;
              console.log("Image URI:", uri);
              setImageUri(uri);
            }
        });
      };
      
      

      const renderItem = ({ item }) => (
        <View style={{ margin: 10, alignSelf: item.type === 'user' ? 'flex-end' : 'flex-start' }}>
          {item.imageUri && <Image source={{ uri: item.imageUri }} style={{ width: 150, height: 150, borderRadius: 10 }} />}
          {item.text && <Text style={{ backgroundColor: item.type === 'user' ? '#007AFF' : '#E5E5EA', color: item.type === 'user' ? '#fff' : '#000', padding: 10, borderRadius: 8, marginTop: 5 }}>{item.text}</Text>}
        </View>
      );


    return (
        <ImageBackground source={require('../asset/chat_bg.jpg')} style={styles.container}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back-ios-new" size={24} style={styles.backIcon} />
                </Pressable>
                <View style={styles.headerText}>
                    <Text style={styles.headerTextTitle}>Coach</Text>
                </View>
                <Image source={require('../asset/male_coach.png')} style={styles.coachImage} />
            </View>

            <FlatList
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 10 }}/>
            {imageUri && (
            <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, alignSelf: 'center' }} />
            )}
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
            <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a message"
            style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10 }}
            />
            <TouchableOpacity onPress={pickImage} style={{ marginHorizontal: 8 }}>
            <Text style={{ fontSize: 24 }}>📷</Text>
            </TouchableOpacity>
            <Button title="Send" onPress={handleSend} />
        </View>


        </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    coachImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.lightMaroon,
        marginEnd: 10,
        marginVertical: 5
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.navy,
    },
    headerText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
    },
    headerTextTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white
    },
    backIcon: {
        color: Colors.white,
        marginStart: 10,
        marginVertical: 5
    }
})


export default ChatScreen;