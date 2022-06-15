import { StyleSheet, View, TouchableOpacity, Image, Pressable } from "react-native";
import { Text } from "react-native-elements";

const SoundButton = (props) => {
    return (
        <Image
            style={styles.tinyImage}
            source={{
                uri: props.image,
            }}
        />
    );
}

const styles = StyleSheet.create({
    soundboard: {
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        aspectRatio: 1 / 1,
        margin: 7,
        width: 105,
        height: 105,
        borderRadius: 15,
        backgroundColor: '#9AC9E8'
    },
    tinyImage: {
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        margin: 7,
        borderRadius: 15,
        width: 105,
        height: 105,
    }
})

export default SoundButton;