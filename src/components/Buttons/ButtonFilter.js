import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/filterSlice";

export const ButtonFilter = (props) => {
    const dispatch = useDispatch();

    //A button for filter, take the prop all or freesound or record and put it in the state filter (redux)
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