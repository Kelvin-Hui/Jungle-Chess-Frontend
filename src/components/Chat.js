import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Chat.css";

import socket from "../connection/Socket";
import Button from "@material-ui/core/Button";

function Chat({ oppoent, userName }) {
  const [chathistory, setChathistory] = useState([
    "Hello " + userName + " ! Welcome!",
  ]);

  socket.off("get_msg").on("get_msg", (data) => {
    setChathistory([...chathistory, data["msg"]]);
  });

  const clearChat = () => {
    setChathistory([]);
  };

  const handleLeave = () => {
    socket.emit("leave", { userName: userName });
  };

  const onClick = () => {
    let message = document.querySelector("input").value;
    if (message !== "") {
      socket.emit("chat", { msg: message });
      document.querySelector("input").value = "";
    } else {
      alert("Cant Send Empty Message!");
    }
  };

  return (
    <div className="grid-chat">
      <div
        className="chat-wrapper"
        style={{ height: `${window.innerHeight * 0.85 - 20}px` }}
      >
        <div className="chat-header">
          Chat with {oppoent}{" "}
          <Link to="/">
            <Button variant="contained" onClick={() => handleLeave()}>
              Leave Room
            </Button>
          </Link>
        </div>
        <div className="chat-chatbox">
          {chathistory.map((msg, idx) => {
            return <li key={idx}>{msg}</li>;
          })}
        </div>
        <div className="chat-input">
          <input
            className="chat-textinput"
            onKeyPress={(e) => {
              e.key === "Enter" && onClick();
            }}
            placeholder="Type Here!"
          />
          <Button onClick={() => onClick()} className="chat-sendbtn">
            {" "}
            Send{" "}
          </Button>
          <Button size="small" variant="contained" onClick={clearChat}>
            Clear Chat
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
