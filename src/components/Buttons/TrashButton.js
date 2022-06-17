import { StyleSheet, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from "react-native";

const TrashButton = (props) => {
    return (
        <View style={styles.container}>
            <Pressable
            style={styles.trashButton}
            onPress={props.function}>
                <Ionicons
                name='trash-outline'
                color='#C70039'
                size={35}/>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    trashButton: {
        textAlign: 'center',
        margin: 10,
        width: 30
    },

});

export default TrashButton;