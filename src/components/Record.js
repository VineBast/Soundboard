import { Text, Input } from "react-native-elements";
import { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { add, soundsSelector } from "../redux/soundsSlice";
import { useDispatch, useSelector } from "react-redux";
import GreenButton from "./Buttons/GreenButton";
import uuid from 'react-native-uuid';
import { Audio } from 'expo-av';

const Record = () => {
    const dispatch = useDispatch();
    const [recording, setRecording] = useState();
    const [soundUri, setSoundUri] = useState('');
    const [title, onChangeTitle] = useState('')
    const [description, onChangeDescription] = useState('');

    const addLocalSound = () => {
        let id = uuid.v4();
        const sound = {
            id: id,
            name: title,
            description: description,
            images: {
                spectral_m: 'https://i.stack.imgur.com/PvPpN.png'
            },
            previews: {
                'preview-hq-mp3': soundUri
            }
        }
        dispatch(add(sound));
        console.log(sound);
        console.log('add local sound');
    }

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
            <GreenButton function={startRecording} title='Start the record' />
            <GreenButton function={stopRecording} title='Stop the record' />
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