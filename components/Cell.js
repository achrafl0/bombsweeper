import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7209b7',
    borderWidth: 0.5,
    borderColor: '#4361ee',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  text: { color: '#4cc9f0' }
})

export default function Cell(props) {
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
  } = props
  const styleBase = { ...styles.container, width: cellWidth, height: cellHeight }
  function renderCell() {
    if (!revealed) {
      return (
        <TouchableOpacity onPress={() => handlePress(indexi, indexj)}>
          <View
            style={{
              ...styleBase,
              backgroundColor: '#4cc9f0',
            }}
          >
            <Text style={styles.text}>{flagged ? 'F' : ''}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    if (!isBomb) {
      return (
        <View>
          <View
            style={{
              ...styleBase,
              backgroundColor: '#7209b7',
            }}
          >
            <Text style={styles.text}>{neighbours !== 0 ? neighbours : ''}</Text>
          </View>
        </View>
      )
    }
    return (
      <View>
        <View
          style={{
            ...styleBase,
            backgroundColor: '#f72585',
          }}
        >
          <Text style={styles.text}>B</Text>
        </View>
      </View>
    )
  }
  return <View>{renderCell()}</View>
}

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
}
