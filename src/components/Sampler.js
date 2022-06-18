import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux"
import { remove, soundsSelector } from "../redux/soundsSlice";
import SoundButton from "./Buttons/SoundButton";
import { Audio } from 'expo-av';

const Sampler = () => {
    const dispatch = useDispatch();
    const sounds = useSelector(soundsSelector);

    //Remove form sounds (from redux) a sound 
    const removeSound = (id) => {
        dispatch(remove(id));
        console.log('remove');
    }

    //use expo av to play a sound
    const playSound = async (uri) => {
        try {
            const { sound } = await Audio.Sound.createAsync({
                uri: uri
            });
            await sound.playAsync();
        }
        catch (error) {
            console.log('Error', error);
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flex}
                numColumns={3}
                data={sounds}
                extraData={sounds}
                keyExtractor={(item) => item.sound.id}
                renderItem={({ item }) => (
                    <SoundButton
                        function={() => playSound(item.sound.previews['preview-hq-mp3'])}
                        longPressFunction={() => removeSound(item.sound.id)}
                        image={item.sound.images.spectral_m}
                    />
                )}
            />
        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#011303',
        flex: 1
    },
    flex: {
        flexWrap: 'wrap',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
})

export default Sampler;