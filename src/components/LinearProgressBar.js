import { StyleSheet, View } from "react-native"
import Svg, { Circle, Line, Rect, Text } from "react-native-svg";
import Colors from "../styles/Colors";

export const LinearProgressBar = ({ percentage }) => {
    return (
        <View style={styles.container}>
            <Svg width="100%" height={8}>
                <Rect x="0" y="0" rx="5" ry="5" fill={Colors.lightMaroon} width="100%" height="8" />
                <Rect x="0"
                    y="0"
                    width={`${percentage}%`}
                    height="8"
                    rx="5"
                    ry="5"
                    fill={Colors.maroon} />
            </Svg>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        
    }
});