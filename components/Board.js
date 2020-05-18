/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
// import libs
import React, { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import PropTypes from 'prop-types'
import random from 'random'
// import componenets
import Cell from './Cell'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#00F5D4',
    width: '100%',
    height: '60%',
    margin: 10,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  rowContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: '100%',
  },
})

export default function Board(props) {
  // ************ Props Destructuring
  const {
    numRows,
    numCols,
    numBomb,
    handleEndGame,
    handleRemainBombs,
    remainingBombs,
    toBeReset,
    handleReset,
  } = props
  // ************ State Declaration
  const [gameData, setGameData] = useState(newBoard(numRows, numCols, numBomb))
  // ************ Style computations
  const screenWidth = Math.round(Dimensions.get('window').width)
  const screenHeight = Math.round(Dimensions.get('window').height)
  const cellWidth = screenWidth / numCols
  const cellHeight = (screenHeight / numRows) * 0.6
  // ************ Helper functions
  useEffect(() => {
    if (toBeReset){
      handleReset(false)
      resetBoard()
    }
  }, [toBeReset])

  function getNeighbours(i, j) {
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
  function resetBoard() {
    setGameData(newBoard(numRows, numCols, numBomb))
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
      if (!newData[rndi][rndj].isBomb) {
        newData[rndi][rndj].isBomb = true
        plantedbombs += 1
      }
    }
    // Adding data about neighbours
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < cols; j += 1) {
        if (!newData[i][j].isBomb) {
          const neigh = getNeighbours(i, j)
          let count = 0
          neigh.forEach((coor) => {
            const [x, y] = coor
            if (newData[x][y].isBomb) {
              count += 1
            }
          })
          newData[i][j].neighbours = count
        } else {
          newData[i][j].neighbours = 9
        }
      }
    }
    return newData
  }
  function revealBoard() {
    const newData = gameData.slice()
    for (let i = 0; i < numRows; i += 1) {
      for (let j = 0; j < numCols; j += 1) {
        newData[i][j].revealed = true
      }
    }
    setGameData(newData)
  }
  function gameover(type) {
    revealBoard()
    handleEndGame(type)
  }
  // ************ Handler Functions
  function handlePress(i, j) {
    if (gameData[i][j].isBomb) {
      gameover('lose')
    } else {
      const newData = gameData.slice()
      newData[i][j].revealed = true
      if (newData[i][j].flagged) {
        newData[i][j].flagged = false
        handleRemainBombs(remainingBombs + 1)
      }
      if (newData[i][j].neighbours === 0) {
        const toBeVisited = getNeighbours(i, j)
        while (toBeVisited.length > 0) {
          const x = toBeVisited[0][0]
          const y = toBeVisited[0][1]
          if (!newData[x][y].flagged && newData[x][y].neighbours === 0 && !newData[x][y].revealed) {
            getNeighbours(x, y).forEach((el) => {
              if (!toBeVisited.includes(el)) {
                toBeVisited.push(el)
              }
            })
          }
          newData[x][y].revealed = true
          toBeVisited.shift()
        }
      }
      setGameData(newData)
    }
  }
  function checkIfWin() {
    const newData = gameData.slice()
    let actualBombs = 0
    let flags = 0
    for (let i = 0; i < numRows; i += 1) {
      for (let j = 0; j < numCols; j += 1) {
        if (newData[i][j].flagged) {
          flags += 1
          if (newData[i][j].isBomb) {
            actualBombs += 1
          }
        }
      }
    }
    if (flags === numBomb && actualBombs === numBomb) {
      gameover('win')
    }
  }
  function handleLongPress(i, j) {
    const newData = gameData.slice()
    if (newData[i][j].flagged) {
      newData[i][j].flagged = false
      handleRemainBombs(remainingBombs + 1)
    } else {
      newData[i][j].flagged = true
      let newRemaining = remainingBombs - 1
      if (newRemaining <= 0) {
        newRemaining = 0
      }
      handleRemainBombs(newRemaining)
      if (newRemaining === 0) {
        checkIfWin()
      }
    }
    setGameData(newData)
  }
  // ************ JSX Return
  return (
    <View style={styles.container}>
      {gameData.map((row, indexi) => {
        return (
          <View style={styles.rowContainer} key={indexi}>
            {row.map((el, indexj) => {
              return (
                <Cell
                  flagged={el.flagged}
                  isBomb={el.isBomb}
                  neighbours={el.neighbours}
                  revealed={el.revealed}
                  key={indexi + indexj * numCols}
                  cellHeight={cellHeight}
                  cellWidth={cellWidth}
                  indexj={indexj}
                  indexi={indexi}
                  handlePress={handlePress}
                  handleLongPress={handleLongPress}
                />
              )
            })}
          </View>
        )
      })}
    </View>
  )
}
// ************ Prop typing
Board.propTypes = {
  numRows: PropTypes.number.isRequired,
  numCols: PropTypes.number.isRequired,
  numBomb: PropTypes.number.isRequired,
  handleEndGame: PropTypes.func.isRequired,
  handleRemainBombs: PropTypes.func.isRequired,
  remainingBombs: PropTypes.number.isRequired,
  toBeReset: PropTypes.bool.isRequired,
  handleReset: PropTypes.func.isRequired,
}
