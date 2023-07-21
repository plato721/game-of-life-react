import React from "react"
import { makeStyles } from "@mui/styles"
import { Typography } from "@mui/material"
import { Slider } from "@mui/material"

const GameSpeed = ({ selectHandler, speed }) => {
  const useStyles = makeStyles({
    root: {
      width: 600,
    },
  })

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Slider value={speed} onChange={selectHandler} />
      <Typography id="game-speed" gutterBottom>
        Game Speed
      </Typography>
    </div>
  )
}

export default GameSpeed
