import { StyleSheet, Image, Pressable } from "react-native";

const SoundButton = (props) => {
    return (
        <Pressable
            onPress={props.function}
            onLongPress={props.longPressFunction}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? '#DAF7A6'
                        : '#011303'
                }]}>
            <Image
                style={styles.tinyImage}
                source={{
                    uri: props.image,
                }}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
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