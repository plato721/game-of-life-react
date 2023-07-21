import React from "react"
import { Button } from "@mui/material"
import RefreshIcon from "@mui/icons-material/Refresh"
import { Grid } from "@mui/material"

const refreshButton = ({ clickHandler }) => {
  const style = {
    borderColor: "gray",
    color: "gray",
  }

  return (
    <Grid item>
      <Button
        style={style}
        onClick={clickHandler}
        className="refresh-button"
        startIcon={<RefreshIcon />}
        variant="outlined"
        size="large"
      >
        {"New Board"}
      </Button>
    </Grid>
  )
}

export default refreshButton
