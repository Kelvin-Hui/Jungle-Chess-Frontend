import React from "react";
import piece_1 from "../assets/Testing/1.png";
import piece_2 from "../assets/Testing/2.png";
import piece_3 from "../assets/Testing/3.png";
import piece_4 from "../assets/Testing/4.png";
import piece_5 from "../assets/Testing/5.png";
import piece_6 from "../assets/Testing/6.png";
import piece_7 from "../assets/Testing/7.png";
import piece_8 from "../assets/Testing/8.png";

import piece_1_blue from "../assets/Testing/1_blue.png";
import piece_2_blue from "../assets/Testing/2_blue.png";
import piece_3_blue from "../assets/Testing/3_blue.png";
import piece_4_blue from "../assets/Testing/4_blue.png";
import piece_5_blue from "../assets/Testing/5_blue.png";
import piece_6_blue from "../assets/Testing/6_blue.png";
import piece_7_blue from "../assets/Testing/7_blue.png";
import piece_8_blue from "../assets/Testing/8_blue.png";

import { Tooltip } from "@material-ui/core";

const pieceimg = [
  piece_1,
  piece_2,
  piece_3,
  piece_4,
  piece_5,
  piece_6,
  piece_7,
  piece_8,
];
const pieceimg_blue = [
  piece_1_blue,
  piece_2_blue,
  piece_3_blue,
  piece_4_blue,
  piece_5_blue,
  piece_6_blue,
  piece_7_blue,
  piece_8_blue,
];

const value_animal = {
  1: "Rat",
  2: "Cat",
  3: "Wolf",
  4: "Dog",
  5: "Leopard",
  6: "Tiger",
  7: "Lion",
  8: "Elephant",
};

function Piece({ ridx, cidx, value, setTemplog, gamestarts, turn, toggle }) {
  let size = "8vh";
  let imgsize = "7vh";

  var x = "";

  const handleDragStart = (e) => {
    x = e.target.id;
  };

  const handleDragEnd = (e) => {
    setTemplog([x, document.elementFromPoint(e.clientX, e.clientY).id]);
  };

  const animal = [-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8];

  // if (value > 0  && value < 15){
  if (animal.includes(value)) {
    if (value > 0) {
      return (
        <div
          className="animalpiece"
          id={String.fromCharCode(65 + ridx) + (cidx + 1)}
          style={{ cursor: "grab", width: size, height: size }}
          value={value}
        >
          <Tooltip title={value_animal[value]}>
            <img
              src={pieceimg[value - 1]}
              id={String.fromCharCode(65 + ridx) + (cidx + 1)}
              draggable={gamestarts && turn}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="animal_img"
              style={{
                alignSelf: "center",
                width: imgsize,
                height: imgsize,
                backgroundColor: "inherit",
              }}
              alt={value}
            ></img>
          </Tooltip>
        </div>
      );
    } else {
      return (
        <div
          className="animalpiece"
          id={String.fromCharCode(65 + ridx) + (cidx + 1)}
          style={{ cursor: "grab", width: size, height: size }}
          value={-value}
        >
          <Tooltip title={value_animal[-value]}>
            <img
              src={pieceimg_blue[-value - 1]}
              id={String.fromCharCode(65 + ridx) + (cidx + 1)}
              draggable={gamestarts && turn}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="animal_img"
              style={{ alignSelf: "center", width: imgsize, height: imgsize }}
              alt={-value}
            ></img>
          </Tooltip>
        </div>
      );
    }
  } else {
    return (
      <div
        className="piece"
        draggable="false"
        id={String.fromCharCode(65 + ridx) + (cidx + 1)}
        value={value}
        style={{ width: size, height: size }}
      >
        {toggle ? (
          <span style={{ opacity: 0.5, alignContent: "center" }}>
            {String.fromCharCode(65 + ridx) + (cidx + 1)}
          </span>
        ) : null}
      </div>
    );
  }
}

export default Piece;
