import './App.css';

import React, { useState } from "react"
import PlayButton from "./components/PlayButton"
import RefreshButton from "./components/RefreshButton"
import Board from "./components/Board"
import GameSpeed from "./components/GameSpeed"
import { Grid } from "@mui/material"
import { Container } from "@mui/material"
import randomBoard from "./utility/randomBoard"

function App() {
  const MINSPEED = 1 // these refer to material-ui continuous slider min/max
  const MAXSPEED = 100

  const defaults = {
    numColumns: 50,
    numRows: 50,
    maxDelay: 1000,
    minDelay: 10,
    delay: 500,
  }

  const [playing, setPlaying] = useState(false)
  const [tickDelay, setTickDelay] = useState(defaults.delay)

  const { numRows, numColumns } = defaults
  const defaultBoard = randomBoard({ numRows, numColumns })
  const [newBoard, setNewBoard] = useState(defaultBoard)

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

  const handlePlayButtonClick = () => setPlaying((playing) => {
    console.log("play button clicked")
    return !playing
  })
  const handleGameSpeedSelect = ((e, value) =>{
      setTickDelay(tickDelayFromSpeed(value))
  })
  const handleRefreshButtonClick = () =>
      setNewBoard(randomBoard({ numRows, numColumns }))

  return (
      <Container className="App" fixed>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item className="App-header">
            <h2>{"Conway's Game of Life"}</h2>
          </Grid>
          <Grid item>
            <Board
                playing={playing}
                tickDuration={tickDelay}
                initialBoard={newBoard}
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

export default App;
