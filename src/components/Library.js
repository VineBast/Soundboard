import { View, Text, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { librarySelector } from "../redux/librarySlice";

const Library = () => {
    const dispatch = useDispatch();
    const library = useSelector(librarySelector);

    return (
        <View>
            <FlatList 
            style={styles.centerText}
            data={library}
            extraData={library}
            keyExtractor={(item) => item.sound.id}
            renderItem={({ item }) => (
                <Card>
                    <Text style={styles.cardText}>{item.name}</Text>
                    <Text style={styles.cardText}>{item.description}</Text>
                    <GreenButton title='add' />
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