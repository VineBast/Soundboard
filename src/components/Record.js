import { Text, Input } from "react-native-elements";
import { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";

const Record = () => {
    const [recording, setRecording] = useState();

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            console.log(recording);
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
        console.log('Recording stopped and stored at', uri);
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter a title for your recording sound'
                leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
            />
            <Input
                placeholder="Enter a description"
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={value => this.setState({ comment: value })}
            />
            <Pressable
                onPress={startRecording}
                style={[styles.button, styles.buttonClose]}>
                <Text>Start</Text>
            </Pressable>
            <Pressable
                onPress={stopRecording}
                style={[styles.button, styles.buttonClose]}>
                <Text>Stop</Text>
            </Pressable>
            <Pressable
                onPress={stopRecording}
                style={[styles.button, styles.buttonClose]}>
                <Text>Add sound</Text>
            </Pressable>
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