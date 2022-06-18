import { Input } from "react-native-elements";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { add } from "../redux/soundsSlice";
import { addToLibrary } from "../redux/librarySlice";
import { useDispatch } from "react-redux";
import GreenButton from "./Buttons/GreenButton";
import uuid from 'react-native-uuid';
import { Audio } from 'expo-av';
import { transformSoundObject } from "../service/transformSoundObject";

const Record = () => {
    const dispatch = useDispatch();
    const [recording, setRecording] = useState();
    const [soundUri, setSoundUri] = useState('');
    const [title, onChangeTitle] = useState('')
    const [description, onChangeDescription] = useState('');

    const addLocalSound = () => {
        let id = uuid.v4();
        const sound = transformSoundObject(id, title, description, 'https://i.stack.imgur.com/PvPpN.png', soundUri, 'record');
        dispatch(add(sound));
        dispatch(addToLibrary(sound));
        console.log('add local sound');
    }

    //async functions from the expo-av doc : request a persmission to audio setup, and record a sound and put it in a useState
    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    //set uri in a useState when the record stop
    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setSoundUri(uri);
        console.log('Recording stopped and stored at', uri);
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter a title for your recording sound'
                value={title}
                onChangeText={onChangeTitle}
                leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
            />
            <Input
                placeholder="Enter a description"
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                value={description}
                onChangeText={onChangeDescription}
            />
            <GreenButton function={startRecording} title='Start' />
            <GreenButton function={stopRecording} title='Stop' />
            <GreenButton function={addLocalSound} title='Add record' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#011303',
        flex: 1
    },
    flex: {
        flexWrap: 'wrap',
    },
    flexGrow: {
        flexGrow: 'no wrap'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 7,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

export default Record;