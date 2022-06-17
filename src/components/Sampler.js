import { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, TouchableOpacity, Image, FlatList, Modal } from "react-native";
import { Button, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux"
import { add, remove, soundsSelector } from "../redux/soundsSlice";
import SoundButton from "./Buttons/SoundButton";
import { Audio, AVPlaybackStatus } from 'expo-av';
import GreenButton from "./Buttons/GreenButton";

const Sampler = () => {
    const dispatch = useDispatch();
    const sounds = useSelector(soundsSelector);
    const [modalVisible, setModalVisible] = useState(false);

    const test = () => {
        console.log(sounds);
    }

    const removeSound = (id) => {
        dispatch(remove(id));
        console.log('remove');
    }

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
            <GreenButton function={test} title='test' />
            <FlatList
                style={styles.flex}
                numColumns={3}
                data={sounds}
                extraData={sounds}
                keyExtractor={(item) => item.sound.id}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => playSound(item.sound.previews['preview-hq-mp3'])}
                        onLongPress={() => removeSound(item.sound.id)}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? '#DAF7A6'
                                    : '#011303'
                            }]}>
                        <SoundButton
                            image={item.sound.images.spectral_m}
                        />
                    </Pressable>
                )}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}></Text>
                        <Text style={styles.modalText}>Test</Text>
                        <GreenButton function={() => setModalVisible(!modalVisible)} title='Close' />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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

export default Sampler;