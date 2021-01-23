import React, { useEffect, useState } from "react";
import "./Board.css";
import Piece from "./Piece";

import socket from "../connection/Socket";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { CircularProgress } from "@material-ui/core";

function Board({ roomId, gamestarts, oppoent, isHost, toggle, score }) {
  const [array, setArray] = useState([]);
  const [templog, setTemplog] = useState([]);
  const [turn, setTurn] = useState(isHost === 1 ? true : false);
  const [loading, setLoading] = useState(true);

  const [infoSnackOpen, setInfoSnackOpen] = useState(false);
  const [errorSnackOpen, setErrorSnackOpen] = useState(false);
  const [warningSnackOpen, setWarningSnackOpen] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    socket.emit("getboard", { roomId: String(roomId) });
    socket.off("get_board").on("get_board", (data) => {
      setArray(data["array"]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (templog.length === 2) {
      if (templog[0] === templog[1] || templog[1] === "") {
        setWarningSnackOpen(true);
        setTemplog([]);
      } else {
        socket.emit("move", {
          oppoent: oppoent,
          turn: turn,
          move: templog,
          team: isHost,
          score: score,
        });
        setTemplog([]);
      }
    }
  }, [templog]);

  socket.off("update_array").on("update_array", (data) => {
    setArray(data["array"]);
  });

  socket.off("update_turn").on("update_turn", (data) => {
    setTurn(data);
  });

  socket.off("infoServerMsg").on("infoServerMsg", (data) => {
    setInfoSnackOpen(true);
    setInfoMsg(data);
  });

  socket.off("errorServerMsg").on("errorServerMsg", (data) => {
    setErrorSnackOpen(true);
    setErrorMsg(data);
  });

  socket.off("gameEnd").on("gameEnd", (data) => {
    setTurn(!data);
  });

  const handleInfoClose = () => {
    setInfoSnackOpen(false);
  };
  const handleErrorClose = () => {
    setErrorSnackOpen(false);
  };
  const handleWarningClose = () => {
    setWarningSnackOpen(false);
  };

  return (
    <div className="array_container">
      <Snackbar
        open={errorSnackOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleErrorClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={handleErrorClose}
        >
          {errorMsg}{" "}
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={infoSnackOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="info"
          onClose={handleInfoClose}
        >
          {" "}
          {infoMsg}{" "}
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={warningSnackOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1000}
        onClose={handleWarningClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="warning"
          onClose={handleWarningClose}
        >
          Invalid Input! Please Enter Valid Input!
        </MuiAlert>
      </Snackbar>

      {loading ? (
        <React.Fragment>
          <span>Waiting</span>
          <span>For</span>
          <span>Server</span>
          <div stlye={{ margin: "auto" }}>
            <CircularProgress />
          </div>
          <span>To</span>
          <span>Start</span>
          <span>!</span>
        </React.Fragment>
      ) : (
        array.map((row, ridx) => {
          return row.map((value, cidx) => {
            return (
              <Piece
                ridx={ridx}
                cidx={cidx}
                value={value}
                setTemplog={setTemplog}
                gamestarts={gamestarts}
                turn={turn}
                toggle={toggle}
              />
            );
          });
        })
      )}
    </div>
  );
}

export default Board;
