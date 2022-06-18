import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/filterSlice";

export const ButtonFilter = (props) => {
    const dispatch = useDispatch();

    return (
        <Button title={props.title}
            onPress={() => {
                dispatch(setFilter(props.dispatch));
            }}
            buttonStyle={{
                backgroundColor: "#C1D998",
                borderRadius: 5,
            }}
            containerStyle={{
                width: 150,
                marginTop: 5,
                marginHorizontal: 5,
            }}
        />
    )
}