import React, { useState, useEffect, useRef } from "react"
import DisplayBoard from "../components/DisplayBoard"
import advanceBoard from "../utility/advanceBoard"

const Board = ({ playing, tickDuration, initialBoard }) => {
  const [board, setBoard] = useState(initialBoard)
  const tickInterval = useRef(null)

  const handleCellClick = (row, column) => {
    const toggleCell = (board, row, column) => {
      board[row][column] = !board[row][column]
      return board
    }
    setBoard((prevBoard) => {
      return toggleCell(JSON.parse(JSON.stringify(prevBoard)), row, column)
    })
  }

  useEffect(() => {
    clearInterval(tickInterval.current)

    if (playing) {
      tickInterval.current = setInterval(() => {
        setBoard((prevBoard) => advanceBoard(prevBoard))
      }, tickDuration)
      return () => clearInterval(tickInterval.current)
    } else {
      tickInterval.current = null
    }
  }, [tickDuration, playing])

  return <DisplayBoard board={board} handleCellClick={handleCellClick} />
}

export default Board
