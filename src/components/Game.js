import React, { useState } from "react";
import "./Game.css";
import Board from "./Board";
import socket from "../connection/Socket";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Tooltip } from "@material-ui/core";

function Game({ userName, oppoent, roomId, gamestarts, isHost }) {
  const [toggle, setToggle] = useState(false);
  const [score, setScore] = useState([0, 0]);
  const [rematchmsg, setRematchmsg] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    socket.emit("response", { res: false, oppoent: oppoent });
    setDialogOpen(false);
  };
  const handleReject = () => {
    socket.emit("response", { res: false, oppoent: oppoent });
    setDialogOpen(false);
  };
  const handleAccept = () => {
    socket.emit("response", { res: true, oppoent: oppoent });
    setDialogOpen(false);
  };

  const handletoggle = () => {
    setToggle(!toggle);
  };
  const handlerematch = () => {
    socket.emit("rematch", { oppoent: oppoent });
  };

  socket.off("rematch_request").on("rematch_request", (data) => {
    setDialogOpen(true);
    setRematchmsg(data["msg"]);
    // let res = window.confirm(data['msg']);
    // socket.emit('response',{'res' : res,'oppoent':oppoent});
  });

  socket.off("update_score").on("update_score", (data) => {
    if (isHost == 1) {
      setScore(data.reverse());
    } else {
      setScore(data);
    }
  });

  return (
    <div className="grid-console">
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Rematch Request</DialogTitle>
        <DialogContent>
          <DialogContentText>{rematchmsg}</DialogContentText>
          <DialogActions>
            <Button onClick={handleReject} color="primary">
              Reject
            </Button>
            <Tooltip title="You will Start First!">
              <Button onClick={handleAccept} color="primary">
                Accept
              </Button>
            </Tooltip>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <div
        className="console-wrapper"
        style={{ height: `${window.innerHeight * 0.85 - 20}px` }}
      >
        <div className="console-header">
          <Button
            variant="contained"
            size="small"
            onClick={() => handletoggle()}
            style={{ fontSize: `25`, marginRight: `20px` }}
          >
            Toggle Notations
          </Button>
          <strong>Room Number : {roomId}</strong>
          <Tooltip title="The Other Player Will Start First If Rematch">
            <Button
              variant="contained"
              size="small"
              className="rematch"
              onClick={() => handlerematch()}
              style={{ fontSize: `25`, marginLeft: `20px` }}
            >
              Ask For Rematch
            </Button>
          </Tooltip>
          <br />
          <span style={{ fontSize: `25`, margin: `25px` }}>{score[0]}</span>
          <u>{userName}</u> <strong>V.S.</strong> <u>{oppoent}</u>
          <span style={{ fontSize: `25`, margin: `25px` }}>{score[1]}</span>
        </div>

        <div
          className="console-game"
          style={{
            width: "58vh",
            margin: "auto",
          }}
        >
          <Board
            roomId={roomId}
            gamestarts={gamestarts}
            oppoent={oppoent}
            isHost={isHost}
            toggle={toggle}
            score={score}
          />
        </div>
      </div>
    </div>
  );
}

export default Game;
