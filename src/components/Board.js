import React from "react";
import { Link } from "react-router-dom";
import socket from "../connections/socket";
import Piece from "./Piece";
import Rule from "./Rule";

export default function Board({ userName, roomId, oppoent, isHost, start }) {
    const [array, setArray] = React.useState([]);
    const [tempMove, setTempMove] = React.useState([]);
    const [toggle, setToggle] = React.useState(false);
    const [score, setScore] = React.useState([0, 0]);
    const [turn, setTurn] = React.useState(isHost === 1 ? true : false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        socket.emit("getboard", { roomId: String(roomId) });
        socket.off("get_board").on("get_board", (data) => {
            setArray(data["array"]);
            setLoading(false);
        });
        // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
        if (tempMove.length === 2) {
            if (tempMove[0] === tempMove[1] || tempMove[1] === "") {
                openSnack(
                    "#FF9800",
                    "Invalid Input! Please Enter Valid Input!"
                );
                setTempMove([]);
            } else {
                socket.emit("move", {
                    oppoent: oppoent,
                    turn: turn,
                    move: tempMove,
                    team: isHost,
                    score: score,
                });
                setTempMove([]);
            }
        }
        // eslint-disable-next-line
    }, [tempMove]);

    socket.off("update_array").on("update_array", (data) => {
        setArray(data["array"]);
    });

    socket.off("update_score").on("update_score", (data) => {
        if (isHost === 1) {
            setScore(data.reverse());
        } else {
            setScore(data);
        }
    });
    socket.off("update_turn").on("update_turn", (data) => {
        setTurn(data);
    });
    socket.off("gameEnd").on("gameEnd", (data) => {
        setTurn(!data);
    });
    socket.off("rematch_request").on("rematch_request", (data) => {
        let modal = document.getElementsByClassName("modal")[0];
        modal.style.display = "flex";
    });
    socket.off("infoServerMsg").on("infoServerMsg", (data) => {
        openSnack("#2196F3", data);
    });

    socket.off("errorServerMsg").on("errorServerMsg", (data) => {
        openSnack("#F44336", data);
    });

    function leaveRoom() {
        socket.emit("leave", { userName: userName });
    }
    function askRematch() {
        socket.emit("rematch", { oppoent: oppoent });
    }
    function handleRematch(e, response) {
        e.preventDefault();
        socket.emit("response", { res: response, oppoent: oppoent });
        let modal = document.getElementsByClassName("modal")[0];
        modal.style.display = "none";
    }
    function openRule() {
        let modal = document.getElementsByClassName("modal_rule")[0];
        modal.style.display = "flex";
    }
    function openSnack(bg, word) {
        var snack = document.getElementById("snack");
        snack.className = "show_snack";
        snack.style.backgroundColor = bg;
        snack.innerHTML = word;
        setTimeout(function () {
            snack.className = snack.className.replace("show_snack", "");
        }, 3000);
    }

    return (
        <div className="board">
            <Rule />
            <div id="snack" />
            <div className="modal">
                <div className="modal_content">
                    <h1>Rematch Request</h1>
                    <h3>{oppoent + " Want A Rematch! Agree?"}</h3>
                    <button
                        className="button_ui"
                        onClick={(e) => handleRematch(e, false)}
                    >
                        Reject
                    </button>
                    <button
                        className="button_ui"
                        onClick={(e) => handleRematch(e, true)}
                    >
                        Accept
                    </button>
                </div>
            </div>

            <b className="room_id">Room Number : {roomId}</b>
            <div>
                <button onClick={() => setToggle(!toggle)}>
                    Toggle Notations
                </button>
                <button onClick={() => askRematch()}>Ask For Rematch</button>
                <Link to="/">
                    <button onClick={() => leaveRoom()}>
                        Leave Current Room
                    </button>
                </Link>

                <button onClick={() => openRule()}>Rules</button>
            </div>
            <div className="score_board">
                <b className="score">{score[0]}</b>
                <u>{userName}</u>
                <b className="score">V.S.</b>
                <u>{oppoent}</u>
                <b className="score">{score[1]}</b>
            </div>
            {oppoent ? (
                <b style={{ color: isHost ? "red" : "deepskyblue" }}>
                    Current Turn : {turn ? "Your Turn" : "Oppoent's Turn"}
                </b>
            ) : (
                <b>Current Status : Waiting For Oppoent</b>
            )}
            {loading ? (
                <div>
                    <h3>Waiting Server...</h3>
                    <div className="loader" />
                </div>
            ) : (
                <div className="board_wrapper">
                    {array.map((row, ridx) => {
                        return row.map((value, cidx) => {
                            return (
                                <Piece
                                    ridx={ridx}
                                    cidx={cidx}
                                    value={value}
                                    key={ridx + cidx}
                                    toggle={toggle}
                                    setTempMove={setTempMove}
                                    turn={turn}
                                    start={start}
                                />
                            );
                        });
                    })}
                </div>
            )}
        </div>
    );
}
