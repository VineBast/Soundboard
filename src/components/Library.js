import { View, Text, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { librarySelector, removeFromLibrary } from "../redux/librarySlice";
import { add } from "../redux/soundsSlice";
import { Card } from "react-native-elements";
import GreenButton from "./Buttons/GreenButton";
import TrashButton from "./Buttons/TrashButton";

const Library = () => {
    const dispatch = useDispatch();
    const library = useSelector(librarySelector);

    const addToSampler = (sound) => {
        dispatch(add(sound))
    }

    const remove = (id) => {
        dispatch(removeFromLibrary(id));
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={library}
                extraData={library}
                keyExtractor={(item) => item.sound.id}
                renderItem={({ item }) => (
                    <Card>
                        <Card.Title style={styles.cardText}>{item.sound.name}</Card.Title>
                        <Card.Divider />
                        <Card.Image source={{ uri: item.sound.images.spectral_m }} />
                        <GreenButton function={() => addToSampler(item.sound)} title='Add to sampler' />
                        <Card.Divider />
                        <Text style={styles.cardText}>Description : </Text>
                        <Text>{item.sound.description}</Text>
                        <TrashButton function={() => remove(item.sound.id)}/>
                    </Card>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#011303'
    },
    centerText: {
        textAlign: 'center'
    },
    cardText: {
        fontSize: 20,
        color: '#8B9D6C'
    }
});

export default Library;