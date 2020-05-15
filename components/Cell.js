import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: 'blue',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
})

export default function Cell(props) {
  const { flagged, isBomb, neighbours, revealed } = props
  return (
    <View style={styles.container}>
      <Text>{isBomb ? 'B' : neighbours}</Text>
    </View>
  )
}

Cell.propTypes = {
  flagged: PropTypes.bool.isRequired,
  isBomb: PropTypes.bool.isRequired,
  neighbours: PropTypes.number.isRequired,
  revealed: PropTypes.bool.isRequired,
}
