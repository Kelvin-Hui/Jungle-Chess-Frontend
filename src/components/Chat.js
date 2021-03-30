import React from "react";
import socket from "../connections/socket";

export default function Chat({ userName }) {
    const [chatHistory, setChatHistory] = React.useState([]);

    socket.off("get_msg").on("get_msg", (data) => {
        setChatHistory([...chatHistory, data["msg"]]);
    });

    function clearChat() {
        setChatHistory([]);
    }

    function sendMsg() {
        let message = document.querySelector("input").value;
        if (message !== "") {
            socket.emit("chat", { msg: message });
            document.querySelector("input").value = "";
        } else {
            alert("Cant Send Empty Message!");
        }
    }

    return (
        <div className="chat">
            <h3>Chat</h3>
            <div className="chat_wrapper">
                <div className="greeting">
                    {"Hello " + userName + "! Welcome!"}
                </div>
                {chatHistory.map((msg, idx) => {
                    let own = msg.match(userName);
                    return (
                        <div key={idx} className={own ? "own_msg" : "oppo_msg"}>
                            {msg.split(": ")[1]}
                        </div>
                    );
                })}
            </div>
            <input
                onKeyPress={(e) => {
                    e.key === "Enter" && sendMsg();
                }}
                placeholder="Chat Here"
            ></input>
            <button className="button_ui" onClick={() => clearChat()}>
                Clear Chat
            </button>
        </div>
    );
}
