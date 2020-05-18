import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Button, Animated, Dimensions, Easing } from 'react-native'
import Board from './components/Board'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9B5DE5',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  gameover: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
    top: '-15%',
    height: '30%',
    width: '80%',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#1B065E',
    backgroundColor: '#336699',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
})

export default function App() {
  // ************ State Declaration
  const [numRows, setRows] = useState(8)
  const [numCols, setCols] = useState(8)
  const [numBomb, setBomb] = useState(15)
  const [isGameOver, setEndGame] = useState(false)
  const [endGameType, setEndGameType] = useState('')
  const [remainingBombs, setRemainingBombs] = useState(numBomb)
  const [toBeReset, setReset] = useState(false)
  // ************ Animation Functions
  const Ybase = Math.round(Dimensions.get('window').height)
  const translateAnim = useRef(new Animated.Value(Ybase * 1.15)).current
  const scaleAnim = useRef(new Animated.Value(1)).current
  function inAnimation() {
    Animated.sequence([
      Animated.timing(translateAnim, {
        toValue: Ybase / 2,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.4,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start()
  }
  function outAnimation() {
    Animated.timing(translateAnim, {
      toValue: Ybase * 1.15,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.out(Easing.quad),
    }).start()
  }
  // ************ Handler Functions
  function handleEndGame(type) {
    setEndGame(true)
    setEndGameType(type)
    inAnimation()
  }
  function handleRemainBombs(value) {
    setRemainingBombs(value)
  }
  function reset() {
    setEndGame(false)
    outAnimation()
    setRemainingBombs(numBomb)
    setEndGameType('')
    setReset(true)
  }
  // ************ JSX Return
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.gameover,
          {
            transform: [
              {
                scale: scaleAnim,
              },
              {
                translateY: translateAnim,
              },
            ],
          },
        ]}
      >
        <Text
          style={{
            color: '#1B065E',
            fontSize: 40,
          }}
        >
          {endGameType === 'win' ? 'You Win !' : 'You lost :('}
        </Text>
        <Button
          title="Reset Board"
          color="#1B065E"
          onPress={() => {
            reset()
          }}
        />
      </Animated.View>
      <Text
        style={{
          color: '#4cc9f0',
          fontSize: 20,
        }}
      >
        Let play some Bombsweeper
      </Text>
      <Text
        style={{
          color: '#4cc9f0',
          fontSize: 15,
        }}
      >
        Remaining Bombs : {remainingBombs}
      </Text>
      <Button
        title="New Game"
        onPress={() => {
          reset()
        }}
      />
      <Board
        numRows={numRows}
        numCols={numCols}
        numBomb={numBomb}
        handleEndGame={handleEndGame}
        handleRemainBombs={handleRemainBombs}
        handleReset={setReset}
        remainingBombs={remainingBombs}
        toBeReset={toBeReset}
        style={{
          flexDirection: 'column',
        }}
      />
    </View>
  )
}
