import {View, Text, TextInput, Button, StyleSheet, Pressable} from 'react-native'
import { useState } from 'react';
function GoalInput(props){
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(enteredText){
        setEnteredGoalText(enteredText) 
    
      }

      function addGoalHandler(){
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
        this.textInput.clear()
      }

    return(
        <View style = {styles.inputContainer}>
      <TextInput style ={styles.textInput} placeholder='YOUR GOALS !' placeholderTextColor="#ffffff" onChangeText={goalInputHandler} ref={input => { this.textInput = input }}/>
    
    <Pressable
          style={styles.button3}
          android_ripple={{color: '#dddddd'}}
          title="ADD GOAL"
          onPress={addGoalHandler}
        >
          <Text style = {styles.buttonText}>ADD GOAL</Text>
        </Pressable>
    </View>

    )
}

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        marginTop:10,
        paddingVertical: 10,
        paddingBottom: 25,
        borderBottomWidth:1,
        borderBottomColor: '#CCCCCC'
       },
       textInput: {
        borderWidth: 1,
        borderColor: 'white',
        color: 'white',
        width:"70%",
        marginRight:8,
        padding:8
       },
       button3: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#161b1f',
      },
      buttonText: {
        fontSize: 15,
        lineHeight: 21,
        
        letterSpacing: 0.25,
        color: 'white',
      },
})