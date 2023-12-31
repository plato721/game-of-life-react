const randomBoard = ({numRows, numColumns, fillPercent = 0.5}) => {
  // create a 2d array representing alive state of all cells.
  //   default to random
  return new Array(numRows)
    .fill("anything")
    .map(() =>
      new Array(numColumns)
        .fill("anything")
        .map(() => (Math.random() < fillPercent))
    )
}

export default randomBoard
