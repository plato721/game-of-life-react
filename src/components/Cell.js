import React from "react"

const Cell = ({ alive, row, column, handleClick }) => {
  const cellClicked = () => handleClick(row, column)

  return alive ? (
    <div className="cell alive" onClick={cellClicked}></div>
  ) : (
    <div className="cell dead" onClick={cellClicked}></div>
  )
}

export default Cell
