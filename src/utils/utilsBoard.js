import random from 'random'

export function getNeighbours(i, j, numRows, numCols) {
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

export function newBoard(rows, cols, bombs) {
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
        const neigh = getNeighbours(i, j, rows, cols)
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
