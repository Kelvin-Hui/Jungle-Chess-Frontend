import React from "react";
import "./styles/App.scss";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    const [userName, setUserName] = React.useState(
        "Player" + new Date().getSeconds()
    );
    const [roomId, setRoomId] = React.useState("");
    const [isHost, setHost] = React.useState(0);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <WelcomePage
                        userName={userName}
                        setUserName={setUserName}
                        setRoomId={setRoomId}
                        setHost={setHost}
                    />
                </Route>
                <Route exact path="/home">
                    <HomePage
                        roomId={roomId}
                        userName={userName}
                        isHost={isHost}
                    />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
