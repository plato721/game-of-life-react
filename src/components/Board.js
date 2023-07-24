import React from "react"
import Cell from "./Cell"
import {Grid} from "@mui/material"

const Board = ({board, handleCellClick}) => {
  const renderRow = (row, rowNumber) => {
    return row.map((isAlive, colNumber) => {
      return (
        <Cell
          alive={isAlive}
          row={rowNumber}
          column={colNumber}
          handleClick={handleCellClick}
          key={`${rowNumber},${colNumber}`}
        />
      )
    })
  }

  const renderRows = () => {
    if (board === null) {
      return <div>Loading...</div>
    }
    return board.map((row, rowNumber) => {
      return (
        <Grid item className="board-row" key={`row_${rowNumber}`}>
          {renderRow(row, rowNumber)}
        </Grid>
      )
    })
  }

  return (
    <Grid container spacing={0} direction="column">
      {renderRows()}
    </Grid>
  )
}

export default Board
