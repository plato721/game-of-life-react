const advanceBoard = (oldBoard) => {
  const aliveNeighborCount = (row, column) => {
    const onBoard = (pair) =>
      pair[0] >= 0 &&
      pair[1] >= 0 &&
      pair[0] < oldBoard.length &&
      pair[1] < oldBoard[1].length

    const neighborCoordinates = () => {
      const dumbCoords = [
        [row - 1, column - 1],
        [row - 1, column],
        [row - 1, column + 1],
        [row, column - 1],
        [row, column + 1],
        [row + 1, column - 1],
        [row + 1, column],
        [row + 1, column + 1],
      ]

      return dumbCoords.filter(onBoard)
    }

    return neighborCoordinates(row, column).reduce((acc, [row, column]) => {
      return acc + (oldBoard[row][column] ? 1 : 0)
    }, 0)
  }

  // 2 or 3 live neighbors keeps a cell alive, 3 live neighbors brings
  // back a dead one.
  const cellAliveNextRound = (row, column) => {
    const numAliveNeighbors = aliveNeighborCount(row, column)
    const cellCurrentlyAlive = oldBoard[row][column]
    return cellCurrentlyAlive
      ? numAliveNeighbors === 2 || numAliveNeighbors === 3
      : numAliveNeighbors === 3
  }

  return oldBoard.map((row, rowNumber) =>
    row.map((_, colNumber) => cellAliveNextRound(rowNumber, colNumber))
  )
}

export default advanceBoard
