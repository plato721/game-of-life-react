import React from "react"
import { Typography } from "@mui/material"
import { Slider } from "@mui/material"

const GameSpeed = ({ selectHandler, speed }) => {
  return (
    <div>
      <Slider
        value={speed}
        onChange={selectHandler}
        sx={{
          root: {
            width: 600
          }
        }}
      />
      <Typography id="game-speed" gutterBottom>
        Game Speed
      </Typography>
    </div>
  )
}

export default GameSpeed
