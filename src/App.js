import React,{useState} from "react";
import Game from "./pages/board/Game";
import HeaderGame from './pages/board/HeaderGame'
import {playersTeamOne,playersTeamTwo} from '../src/data/Players'
import './App.css';

function App() {
  const [setPlayerState,changePlayerState] = useState({playersTeamOne,playersTeamTwo});
  
  const callBackPlayerState = (callback) =>{
    changePlayerState(callback)
  }
  
  return (
    <div className="Home">
      <HeaderGame setPlayerState={setPlayerState} />
      
      {/* only board under flex, others pos fix */}
      <Game className="board" callBackPlayerState={callBackPlayerState} />
    </div>
  );
}

export default App;
