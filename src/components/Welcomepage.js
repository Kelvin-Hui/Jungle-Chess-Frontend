import React from "react";
import socket from "../connections/socket";
import Footer from "./Footer";
import bg from "../assets/bg.jpg";

import { Link } from "react-router-dom";

export default function WelcomePage({
    userName,
    setUserName,
    setRoomId,
    setHost,
}) {
    const [type, setType] = React.useState("");
    const room_Id = React.useRef();
    const user_Name = React.useRef();

    function randomId() {
        return Math.floor(Math.random() * (10000 - 20 + 1)) + 20;
    }

    function controlModal(e, type) {
        e.preventDefault();
        let modal = document.getElementsByClassName("modal")[0];
        modal.style.display = type;
    }
    window.onclick = function (event) {
        let modal = document.getElementsByClassName("modal")[0];
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    function handleModal() {
        let getName = userName;
        // eslint-disable-next-line
        if (user_Name.current.value != "") {
            getName = user_Name.current.value;
        }
        let getRoomId = randomId();
        // eslint-disable-next-line
        if (room_Id.current.value != "") {
            getRoomId = room_Id.current.value;
        }
        setRoomId(getRoomId);
        setUserName(getName);

        let parms = { userName: getName, roomId: String(getRoomId) };
        if (type !== "join") {
            socket.emit("create", parms);
            socket.on("getRoomId_create", (data) => {
                setRoomId(data["roomId"]);
            });
            setHost(1);
        } else {
            socket.emit("join", parms);
            socket.on("getRoomId_join", (data) => {
                setRoomId(data["roomId"]);
            });
        }
    }

    return (
        <div className="wrapper">
            <div className="modal">
                <div className="modal_content">
                    <h1>Enter Room ID:</h1>
                    <h5>Will Create Random ID If Blank </h5>

                    <label>Room ID :</label>
                    <input
                        ref={room_Id}
                        autoFocus
                        className="input_ui"
                        id="room_id"
                        placeholder="Enter here"
                        autoComplete="off"
                    ></input>
                    <div>
                        <button
                            className="button_ui"
                            onClick={(e) => controlModal(e, "none")}
                        >
                            Cancel
                        </button>
                        <Link to="/home">
                            <button
                                className="button_ui"
                                onClick={() => handleModal()}
                            >
                                Enter
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg">
                <img src={bg} alt="background pic" />
            </div>
            <div className="title">Jungle Chess</div>
            <div className="props_wrapper">
                <form className="props">
                    <div>Create Your Username:</div>
                    <input
                        className="input_ui"
                        onKeyPress={(e) => {
                            e.key === "Enter" && e.preventDefault();
                        }}
                        autoFocus
                        ref={user_Name}
                    />
                    <div>
                        <button
                            className="button_ui"
                            onClick={(e) => {
                                controlModal(e, "flex");
                                setType("create");
                            }}
                        >
                            Create Room
                        </button>
                        <button
                            className="button_ui"
                            onClick={(e) => {
                                controlModal(e, "flex");
                                setType("join");
                            }}
                        >
                            Join Room
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}
