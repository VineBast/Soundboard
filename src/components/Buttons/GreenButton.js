import { Button } from "react-native-elements";

const GreenButton = (props) => {
    return (
        <Button onPress={props.function}
            title={props.title}
            buttonStyle={{
                backgroundColor: '#8B9D6C',
            }}
            containerStyle={{
                marginHorizontal: 50,
                marginVertical: 10,
            }} />
    );
}

export default GreenButton;