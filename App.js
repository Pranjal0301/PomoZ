import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, ImageBackground, Pressable, StyleSheet, TextInput, ScrollView, FlatList, Modal, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

const formatTime = (remainingTime) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return `${minutes}:${seconds}`;
};

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <Text style={styles.timer}>Time for a break</Text>;
  }

  return (
    <View style={styles.timer}>
      <Text style={styles.value}>{formatTime(remainingTime)}</Text>
    </View>
  );
};

export default function App() {
  const [key, setKey] = useState(0);
  const [boolVal, setBoolVal] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem('onboardingStatus');
      if (onboardingStatus !== null && onboardingStatus === 'completed') {
        setShowOnboarding(false);
      }
    } catch (error) {
      console.log('Error reading onboarding status from AsyncStorage:', error);
    }
  };

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  const closeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingStatus', 'completed');
      setShowOnboarding(false);
    } catch (error) {
      console.log('Error saving onboarding status in AsyncStorage:', error);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/pexels-philippe-donn-1257860.jpg')}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
        <Text style={styles.title}>
          Pomodoro Timer
          {"\n"}
        </Text>
        <View style={styles.timerWrapper}>
          <CountdownCircleTimer
            key={key}
            isPlaying={boolVal}
            duration={1500}
            strokeWidth={3.5}
            trailColor={''}
            colors={['#f0f6fa']}
            onComplete={() => [true, 1000]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </View>
        <View style={styles.buttonWrapper}>
          <Pressable
            style={styles.button1}
            android_ripple={{ color: '#dddddd' }}
            title="Start Timer"
            onPress={() => setBoolVal((prevKey) => !prevKey)}
          >
            <Text style={styles.buttonText}>Start/Stop</Text>
          </Pressable>
          <Pressable
            style={styles.button2}
            android_ripple={{ color: '#dddddd' }}
            title="Restart Timer"
            onPress={() => setKey((prevKey) => prevKey + 1)}
          >
            <Text style={styles.buttonText}>Restart Timer</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <View style={styles.appContainer}>
        <GoalInput onAddGoal={addGoalHandler} />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler} />;
            }}
          />
        </View>
      </View>

      {/* Onboarding Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showOnboarding}
        onRequestClose={() => setShowOnboarding(false)}
      >
        <View style={styles.onboardingModalContainer}>
          {/* Add your onboarding content here */}
          <Text style={styles.onboardingText}>Welcome to Pomodoro Timer!</Text>
          <Text style={styles.onboardingText}>This app helps you stay focused and productive by following the Pomodoro Technique.</Text>
          <Text style={styles.onboardingText}>The Pomodoro Technique is a time management method that breaks work into intervals, traditionally 25 minutes in length, separated by short breaks.</Text>
          <Text style={styles.onboardingText}>Click the "Start/Stop" button to start the timer. The timer will run for 25 minutes and notify you when it's time for a break.</Text>
          <Text style={styles.onboardingText}>You can add your goals using the input below and delete them by clicking on them once they are accomplished.</Text>

          <Text style={styles.onboardingText}>Developed By Pranjal Sarode</Text>
          <Text style={styles.onboardingText}>Contact Me @LinkedIn for Feedbacks (: </Text>
          
          <Button title="Got it!" onPress={closeOnboarding} color={'#161b1f'} />
        </View>
      </Modal>
    </ImageBackground>
  );
}


const styles = {
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color:'white',
    paddingTop:50,
    marginBottom: 20,
  },
  timerWrapper: {
    marginBottom: 20,
    
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    color:'white',
    justifyContent: 'center',
  },
  text: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    marginHorizontal: 5,
  },
  value: {
    fontSize: 24,
    color:'white',
    fontWeight: 'bold',
  },
  buttonWrapper: {
    flexDirection: 'row',

    marginBottom: 20,
    
  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal:3.5,
    elevation: 3,
    backgroundColor: '#161b1f',
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginHorizontal:3.5,
    elevation: 3,
    backgroundColor: '#161b1f',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold', 
    letterSpacing: 0.25,
    color: 'white',
  },
  appContainer: {
    flex:1,
    paddingTop:50,
    paddingHorizontal:16,
   },
  
   goalsContainer: {
    flex:2,
   },
   onboardingModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  onboardingText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
};
