import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Board from './components/Board'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})

export default function App() {
  const [numRows, setRows] = useState(9)
  const [numCols, setCols] = useState(9)
  const [numBomb, setBomb] = useState(20)
  const [hasWon, setWin] = useState(false)
  const [hasLost, setLose] = useState(false)

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginBottom: 10,
        }}
      >
        Let play some Minsweeper
      </Text>
      <Board
        numRows={numRows}
        numCols={numCols}
        numBomb={numBomb}
        style={{
          flexDirection: 'column',
        }}
      />
    </View>
  )
}
