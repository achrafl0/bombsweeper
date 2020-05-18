import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9B5DE5',
    borderWidth: 0.5,
    borderColor: '#00F5D4',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
})

export default function Cell(props) {
  // ************ Props Destructuring
  const {
    flagged,
    isBomb,
    neighbours,
    revealed,
    cellWidth,
    cellHeight,
    indexi,
    indexj,
    handlePress,
    handleLongPress,
  } = props
  // ************ Style Computation
  const styleBase = { ...styles.container, width: cellWidth, height: cellHeight }
  const bgColors = {
    unrevealed: '#00BBF9',
    bomb: '#F15BB5',
    revealed: '#9B5DE5',
    flagged: '#FEE440',
  }
  function getContent() {
    if (!revealed) {
      return {
        text: flagged ? 'F' : '',
        bgcolor: flagged ? bgColors.flagged : bgColors.unrevealed,
        txtcolor: '#4cc9f0',
      }
    }
    if (!isBomb) {
      return {
        text: neighbours !== 0 ? neighbours : '',
        bgcolor: bgColors.revealed,
        txtcolor: '#4cc9f0',
      }
    }
    return {
      text: 'B',
      bgcolor: bgColors.bomb,
      txtcolor: '#4cc9f0',
    }
  }
  // ************ JSX Returns
  function renderHelper() {
    const { text, bgcolor, txtcolor } = getContent()
    return (
      <View
        style={{
          ...styleBase,
          backgroundColor: bgcolor,
        }}
      >
        <Text style={{ color: txtcolor }}>{text}</Text>
      </View>
    )
  }
  function renderCell() {
    if (!revealed) {
      return (
        <TouchableOpacity
          onPress={() => handlePress(indexi, indexj)}
          onLongPress={() => handleLongPress(indexi, indexj)}
          delayLongPress={200}
        >
          {renderHelper()}
        </TouchableOpacity>
      )
    }
    return <View>{renderHelper()}</View>
  }
  return <View>{renderCell()}</View>
}
// ************ Prop Typing
Cell.propTypes = {
  flagged: PropTypes.bool.isRequired,
  isBomb: PropTypes.bool.isRequired,
  neighbours: PropTypes.number.isRequired,
  revealed: PropTypes.bool.isRequired,
  cellWidth: PropTypes.number.isRequired,
  cellHeight: PropTypes.number.isRequired,
  indexi: PropTypes.number.isRequired,
  indexj: PropTypes.number.isRequired,
  handlePress: PropTypes.func.isRequired,
  handleLongPress: PropTypes.func.isRequired,
}
