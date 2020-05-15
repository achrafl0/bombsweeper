/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
// import libs
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import random from 'random'
// import componenets
import Row from './Row'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 20,
    width: '95%',
    height: '60%',
    margin: 10,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
})

export default function Board(props) {
  const { numRows, numCols, numBomb } = props
  const [gameData, setGameData] = useState(newBoard(numRows, numCols, numBomb))

  function getNeighboours(i, j) {
    const neigh = []
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        if (!(x === 0 && y === 0)) {
          const newX = i + x
          const newY = j + y
          if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
            neigh.push([newX, newY])
          }
        }
      }
    }
    return neigh
  }

  function newBoard(rows, cols, bombs) {
    // Initializing the array
    const newData = []
    for (let i = 0; i < rows; i += 1) {
      newData.push([])
      for (let j = 0; j < cols; j += 1) {
        newData[i][j] = {
          flagged: false,
          isBomb: false,
          neighbours: 0,
          revealed: false,
        }
      }
    }
    // Planting bombs
    let plantedbombs = 0
    while (plantedbombs < bombs) {
      const rndi = random.int(0, rows - 1)
      const rndj = random.int(0, cols - 1)
      newData[rndi][rndj].isBomb = true
      plantedbombs += 1
    }
    // Adding data about neighbours
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < cols; j += 1) {
        if (!newData[i][j].isBomb) {
          const neigh = getNeighboours(i, j)
          let count = 1
          neigh.forEach((coor) => {
            const [x, y] = coor
            if (newData[x][y].isBomb) {
              count += 1
            }
          })
          newData[i][j].neighbours = count
        }
      }
    }
    newData[0][0].neighbours = 3
    return newData
  }
  return (
    <View style={styles.container}>
      {gameData.map((row, indexi) => {
        return <Row row={row} key={indexi} />
      })}
    </View>
  )
}

Board.propTypes = {
  numRows: PropTypes.number.isRequired,
  numCols: PropTypes.number.isRequired,
  numBomb: PropTypes.number.isRequired,
}
