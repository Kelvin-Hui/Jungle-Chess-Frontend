import React from "react";
import socket from "../connections/socket";
import { Redirect } from "react-router";
import bg from "../assets/bg.jpg";
import Log from "./Log";
import Board from "./Board";
import Chat from "./Chat";

export default function HomePage({ userName, roomId, isHost }) {
    const [start, setStart] = React.useState(false);
    const [oppoent, setOppoent] = React.useState("");

    socket.off("getOppoent").on("getOppoent", (data) => {
        if (isHost === 1) {
            setOppoent(data["Oppoent"][1]);
        } else {
            setOppoent(data["Oppoent"][0]);
        }
        alert("Game Start!");
        setStart(true);
    });

    if (roomId !== "") {
        return (
            <div className="grid">
                <div className="bg">
                    <img src={bg} alt="background pic" />
                </div>
                <div className="header">Jungle Chess</div>
                <Log />
                <Board
                    userName={userName}
                    oppoent={oppoent}
                    roomId={roomId}
                    isHost={isHost}
                    start={start}
                />
                <Chat userName={userName} />
            </div>
        );
    } else {
        return <Redirect to="/" />;
    }
}
