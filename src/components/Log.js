import React from "react";
import socket from "../connections/socket";

export default function Log() {
    const [log, setLog] = React.useState([]);
    function clearLog() {
        setLog([]);
    }
    socket.off("get_log").on("get_log", (data) => {
        setLog([...log, data["logmsg"]]);
    });

    return (
        <div className="log">
            <h3>Log</h3>
            <div className="log_wrapper">
                {log.map((move, idx) => {
                    return (
                        <div className="log_item" key={idx}>
                            {move}
                        </div>
                    );
                })}
            </div>
            <button className="button_ui" onClick={() => clearLog()}>
                Clear Log
            </button>
        </div>
    );
}
