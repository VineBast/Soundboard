import { View, StatusBar, FlatList, StyleSheet } from "react-native";
import { SearchBar, Card, Text, Button } from 'react-native-elements';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from '../redux/soundsSlice';
import GreenButton from "./Buttons/GreenButton";
import { addToLibrary } from "../redux/librarySlice";
import { transformSoundObject } from '../service/transformSoundObject';

const createRequest = (search) => {
    return ('https://freesound.org/apiv2/search/text/?query=' + search + '&token=Ko0whJzjC4Mb94Xe7te8Ma5A49gwuPfM4zlzm2Ea&format=json');
}

const createRequestSound = (id) => {
    return ('https://freesound.org/apiv2/sounds/' + id + '?token=Ko0whJzjC4Mb94Xe7te8Ma5A49gwuPfM4zlzm2Ea&format=json');
}

const Search = () => {
    const dispatch = useDispatch();
    const [search, onChangeSearch] = useState('');
    const [soundsList, setSoundsList] = useState([]);

    //Add a type the object sound and add it to redux (for sounds and library)
    const addSound = (soundFound) => {
        const sound = transformSoundObject(soundFound.id, soundFound.name, soundFound.description, soundFound.images.spectral_m, soundFound.previews['preview-hq-mp3'], 'freesound');
        dispatch(add(sound));
        dispatch(addToLibrary(sound));
        console.log('add');
    }

    //async functions, call the Freesound api and transform response in json :
    //1st one, find all sounds with a key word
    const findRequest = async () => {
        let req = await fetch(createRequest(search));
        let sounds = await req.json();
        setSoundsList(sounds);
    }

    //2nd one find the sound selected by id
    const findSound = async (id) => {
        let req = await fetch(createRequestSound(id));
        let soundFound = await req.json();
        addSound(soundFound);
    }

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder='Search a sound in FreeSound'
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