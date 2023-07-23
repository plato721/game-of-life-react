import './App.css';

import { Container } from "@mui/material"
import Game from "./components/Game";

function App() {

  return (
      <Container className="App" fixed>
        <Game />
      </Container>
  )
}

export default App;
