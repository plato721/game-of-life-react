import '../App.css';

import React, {useEffect, useRef, useState} from "react"
import PlayButton from "./PlayButton"
import RefreshButton from "./RefreshButton"
import GameSpeed from "./GameSpeed"
import {Grid} from "@mui/material"
import {Container} from "@mui/material"
import randomBoard from "../utility/randomBoard"
import advanceBoard from "../utility/advanceBoard";
import DisplayBoard from "./DisplayBoard";
import speedControls from "../utility/speedControls"

function Game() {
  const numRows = 50
  const numColumns = 50
  const defaultSpeed = speedControls.medianSpeed()
  const defaultTickDelay = speedControls.tickDelayFromSpeed(defaultSpeed)

  const [playing, setPlaying] = useState(false)
  const [tickSpeed, setTickSpeed] = useState(50)
  const [tickDelay, setTickDelay] = useState(defaultTickDelay)

  const tickInterval = useRef(null)

  const getRandomBoard = () => randomBoard({numRows, numColumns});
  const [board, setBoard] = useState(getRandomBoard())

  const handlePlayButtonClick = () => setPlaying((playing) => !playing)

  const handleGameSpeedSelect = (e, value) => {
    let newTickDelay = speedControls.tickDelayFromSpeed(value)
    let newSpeed = speedControls.speedFromTickDelay(newTickDelay)
    setTickDelay(newTickDelay)
    setTickSpeed(newSpeed)
  }
  const handleRefreshButtonClick = () => setBoard(getRandomBoard())

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
      }, tickDelay)
      return () => clearInterval(tickInterval.current)
    } else {
      tickInterval.current = null
    }
  }, [tickDelay, playing])

  return (
    <Container className="App" fixed>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item className="App-header">
          <h2>{"Conway's Game of Life"}</h2>
        </Grid>
        <Grid item>
          <DisplayBoard
            board={board}
            handleCellClick={handleCellClick}
          />
        </Grid>
        <Grid item container direction="row" justifyContent="space-around">
          <RefreshButton clickHandler={handleRefreshButtonClick}/>
          <PlayButton clickHandler={handlePlayButtonClick} playing={playing}/>
        </Grid>
        <Grid item>
          <GameSpeed
            selectHandler={handleGameSpeedSelect}
            speed={tickSpeed}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Game;
