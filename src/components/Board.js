/* eslint-disable react/no-array-index-key */
// import libs
import React, { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import PropTypes from 'prop-types'
import { getNeighbours, newBoard } from '../utils/utilsBoard'
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
    flex: 1,
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
  // We have a 0.6 factor because the board only takes 60% of the height of the screen
  const cellHeight = (screenHeight / numRows) * 0.6
  // ************ Helper functions
  function resetBoard() {
    setGameData(newBoard(numRows, numCols, numBomb))
  }
  useEffect(() => {
    if (toBeReset) {
      handleReset(false)
      resetBoard()
    }
  }, [toBeReset])

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
        // We use a floodfill-like algorithm to reveal the cells
        const toBeVisited = getNeighbours(i, j, numRows, numCols)
        while (toBeVisited.length > 0) {
          const x = toBeVisited[0][0]
          const y = toBeVisited[0][1]
          if (!newData[x][y].flagged && newData[x][y].neighbours === 0 && !newData[x][y].revealed) {
            getNeighbours(x, y, numRows, numCols).forEach((el) => {
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
