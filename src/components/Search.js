import { View, TouchableOpacity, StatusBar, FlatList, StyleSheet, Pressable } from "react-native";
import { SearchBar, Card, Text, Button } from 'react-native-elements';
import { useState } from "react";
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Recording, Sound } from 'expo-av/build/Audio';
import { useDispatch, useSelector } from "react-redux";
import { add, soundsSelector } from '../redux/soundsSlice';
import GreenButton from "./Buttons/GreenButton";

const createRequest = (search) => {
    return ('https://freesound.org/apiv2/search/text/?query=' + search + '&token=Ko0whJzjC4Mb94Xe7te8Ma5A49gwuPfM4zlzm2Ea&format=json');
}

const createRequestSound = (id) => {
    return ('https://freesound.org/apiv2/sounds/' + id + '?token=Ko0whJzjC4Mb94Xe7te8Ma5A49gwuPfM4zlzm2Ea&format=json');
}

const Search = ({ navigation }) => {
    const dispatch = useDispatch();
    const sounds = useSelector(soundsSelector);
    const [search, onChangeSearch] = useState('');
    const [soundsList, setSoundsList] = useState([]);
    const [sound, setSound] = useState();

    const addSound = (soundFound) => {
        dispatch(add(soundFound));
        console.log('add');
    }

    const findRequest = async () => {
        let req = await fetch(createRequest(search));
        let sounds = await req.json();
        setSoundsList(sounds);
    }

    const findSound = async (id) => {
        let req = await fetch(createRequestSound(id));
        let soundFound = await req.json();
        addSound(soundFound);
        console.log(soundFound.previews['preview-hq-mp3']);
    }

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder='Search a song in FreeSound'
                placeholderTextColor='white'
                round='true'
                value={search}
                onChangeText={onChangeSearch}
                containerStyle={{ backgroundColor: '#011303', width: '100%' }}
                inputContainerStyle={{ backgroundColor: '#B5BDA5' }}
            />
            <GreenButton function={findRequest} title='search' />
            <FlatList
                style={styles.centerText}
                data={soundsList.results}
                extraData={soundsList.results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card>
                        <Text style={styles.cardText}>{item.name}</Text>
                        <GreenButton title='add' function={() => findSound(item.id)} />
                    </Card>
                )}
            />
            <StatusBar style='auto' />
        </View>
    );
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

export default Search;