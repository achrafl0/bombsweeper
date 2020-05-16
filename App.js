import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Board from './components/Board'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7209b7',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
})

export default function App() {
  const [numRows, setRows] = useState(5)
  const [numCols, setCols] = useState(5)
  const [numBomb, setBomb] = useState(3)

  return (
    <View style={styles.container}>
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
        Remaining Bombs : 5
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
