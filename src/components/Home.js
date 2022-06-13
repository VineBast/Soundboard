import { View, TouchableOpacity, StatusBar, FlatList, StyleSheet } from "react-native";
import { SearchBar, Card, Text, Button } from 'react-native-elements';
import { useState } from "react";
import { test } from '../service/requestFreeSound';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Recording, Sound } from 'expo-av/build/Audio';
import { useDispatch, useSelector } from "react-redux";
import { add, soundsSelector } from '../redux/soundsSlice';

const addSound = (sound) => {
    dispatch(add(sound))
    console.log('add');
}

const createRequest = (search) => {
    return ('https://freesound.org/apiv2/search/text/?query=' + search + '&token=Ko0whJzjC4Mb94Xe7te8Ma5A49gwuPfM4zlzm2Ea&format=json');
}

const createRequestSound = (id) => {
    return ('https://freesound.org/apiv2/sounds/'+ id + '?token=Ko0whJzjC4Mb94Xe7te8Ma5A49gwuPfM4zlzm2Ea&format=json');
}

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const sounds = useSelector(soundsSelector);
    const [search, onChangeSearch] = useState('');
    const [soundsList, setSoundsList] = useState([]);
    const [sound, setSound] = useState();

    const addSound = (audioSound) => {
        dispatch(add(audioSound));
        console.log('add');
    }

    const importSound = async (uri) => {
        console.log(uri);
        try {
            const { sound } = await Audio.Sound.createAsync({
                uri: uri
            });
            console.log('importSound');
            console.log(sound);
            //setSound(sound);
            console.log(sound);
            addSound(sound);
        }
        catch (error) {
            console.log('Error', error);
        }
    }

    const playSound = async () => {
        console.log(sounds);
        //await sounds[1].sound.playAsync();
        // IL FAUT METTRE LE LIEN CDN DANS LE REDUX !!!!
        await sound.playAsync();
    }

    const findRequest = async () => {
        let req = await fetch(createRequest(search));
        let sounds = await req.json();
        setSoundsList(sounds);
    }

    const findSound = async (id) => {
        let req = await fetch(createRequestSound(id));
        let soundFound = await req.json();
        importSound(soundFound.previews['preview-hq-mp3']);
        console.log(soundFound.previews['preview-hq-mp3']);
    }

    const test = (item) => {
        console.log(item);
    }

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder='Search a song in FreeSound'
                round='true'
                value={search}
                onChangeText={onChangeSearch}
                containerStyle={{ backgroundColor: 'white', width: '100%' }}
                inputContainerStyle={{ backgroundColor: 'white' }}
                lightTheme='true' />
            <Button onPress={findRequest}
                title='search'
                containerStyle={{
                    marginHorizontal: 50,
                    marginVertical: 10,
                }} />
            <FlatList
                data={soundsList.results}
                extraData={soundsList.results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card>
                        <Text>{item.name}</Text>
                        <Button title='add' onPress={() => findSound(item.id)} />
                    </Card>
                )}
            />
            <Button onPress={playSound} />

            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Home;