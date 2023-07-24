import { View, Text, StyleSheet, Pressable} from "react-native";
function GoalItem(props){
    return (
        <Pressable  android_ripple={{color: '#dddddd'}} onPress={props.onDeleteItem.bind(this, props.id)}>
        <View style = {styles.goalItem}>
            <Text style = {styles.goalText}>{props.text}</Text>
          </View>
        </Pressable>
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    goalItem:{
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#161b1f',
        padding: 8,
       
       },
       goalText:{
        color: 'white'
       },
       
})