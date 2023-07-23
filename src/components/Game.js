import '../App.css';

import React, {useEffect, useRef, useState} from "react"
import PlayButton from "./PlayButton"
import RefreshButton from "./RefreshButton"
import GameSpeed from "./GameSpeed"
import { Grid } from "@mui/material"
import { Container } from "@mui/material"
import randomBoard from "../utility/randomBoard"
import advanceBoard from "../utility/advanceBoard";
import DisplayBoard from "./DisplayBoard";

function Game() {
  const MINSPEED = 1 // these refer to material-ui continuous slider min/max
  const MAXSPEED = 100

  const defaults = {
    numColumns: 50,
    numRows: 50,
    maxDelay: 1000,
    minDelay: 10,
    delay: 500,
  }

  const { numRows, numColumns } = defaults

  const [playing, setPlaying] = useState(false)
  const [tickDelay, setTickDelay] = useState(defaults.delay)
  const tickInterval = useRef(null)

  const getRandomBoard = () => randomBoard({numRows, numColumns});
  const [board, setBoard] = useState(getRandomBoard())

  // take speed 1 to 100 and map to tick delay
  const tickDelayFromSpeed = (speed) => {
    const reversedScale = MINSPEED + MAXSPEED - speed // max is now slowest, min fastest
    const percentOfScale = (reversedScale - MINSPEED) / (MAXSPEED - MINSPEED)
    return Math.round(percentOfScale * defaults.maxDelay + defaults.minDelay)
  }

  // take delay from min to max and map to 1 to 100
  const speedFromTickDelay = (delay) => {
    const percentOfScale = (delay - defaults.minDelay) / defaults.maxDelay
    const rescaled = Math.round(
      percentOfScale * (MAXSPEED - MINSPEED) + MINSPEED
    )
    return MAXSPEED - rescaled + MINSPEED
  }

  const handlePlayButtonClick = () => setPlaying((playing) => !playing)

  const handleGameSpeedSelect = ((e, value) =>
      setTickDelay(tickDelayFromSpeed(value))
  )
  const handleRefreshButtonClick = () => setBoard( getRandomBoard())

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
          <RefreshButton clickHandler={handleRefreshButtonClick} />
          <PlayButton clickHandler={handlePlayButtonClick} playing={playing} />
        </Grid>
        <Grid item>
          <GameSpeed
            selectHandler={handleGameSpeedSelect}
            speed={speedFromTickDelay(tickDelay)}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Game;
