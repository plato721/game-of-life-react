import React from "react"
import { Button } from "@mui/material"
import PlayIcon from "@mui/icons-material/PlayCircleOutline"
import PauseIcon from "@mui/icons-material/PauseCircleOutline"
import { Grid } from "@mui/material"

const playButton = ({ playing, clickHandler }) => {
  return (
    <Grid item>
      <Button
        onClick={clickHandler}
        color={playing ? "secondary" : "primary"}
        startIcon={playing ? <PauseIcon /> : <PlayIcon />}
        variant="outlined"
        size="large"
      >
        {playing ? "Pause" : "Play"}
      </Button>
    </Grid>
  )
}

export default playButton
