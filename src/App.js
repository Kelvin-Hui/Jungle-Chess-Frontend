import React,{useState}from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

import Homepage from "./components/Homepage";
import Welcomepage from "./components/Welcomepage";


function App() {
  const d = new Date()
  const [userName, setUserName] = useState("Player" + d.getSeconds());
  const [roomId, setRoomId] = useState("");
  const [isHost, setHost] = useState(0);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Welcomepage userName = {userName} setUserName = {setUserName} roomId={roomId} setRoomId={setRoomId} setHost={setHost} />
        </Route>
        <Route exact path="/home">
          <Homepage roomId = {roomId} setRoomId={setRoomId} userName = {userName} isHost = {isHost}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;