import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import Cell from './Cell'

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
})

export default function Row(props) {
  const { row } = props
  return (
    <View style={styles.rowContainer}>
      {row.map((el, index) => {
        return (
          <Cell
            flagged={el.flagged}
            isBomb={el.flagged}
            neighbours={el.neighbours}
            revealed={el.revealed}
            key={index}
          />
        )
      })}
    </View>
  )
}

Row.propTypes = {
  row: PropTypes.arrayOf(
    PropTypes.shape({
      flagged: PropTypes.bool.isRequired,
      isBomb: PropTypes.bool.isRequired,
      neighbours: PropTypes.number.isRequired,
      revealed: PropTypes.bool.isRequired,
    })
  ).isRequired,
}
