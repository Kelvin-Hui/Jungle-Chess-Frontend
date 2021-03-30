import React from "react";
import {
    piece_1,
    piece_2,
    piece_3,
    piece_4,
    piece_5,
    piece_6,
    piece_7,
    piece_8,
    piece_1_blue,
    piece_2_blue,
    piece_3_blue,
    piece_4_blue,
    piece_5_blue,
    piece_6_blue,
    piece_7_blue,
    piece_8_blue,
} from "../assets";
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
const animal = [-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8];
export default function Piece({
    value,
    ridx,
    cidx,
    toggle,
    setTempMove,
    turn,
    start,
}) {
    var move = "";
    function dragStart(e) {
        move = e.target.id;
    }
    function dragEnd(e) {
        setTempMove([move, document.elementFromPoint(e.clientX, e.clientY).id]);
    }

    if (animal.includes(value)) {
        if (value > 0) {
            return (
                <div
                    className="animalpiece"
                    id={String.fromCharCode(65 + ridx) + (cidx + 1)}
                    value={value}
                >
                    <img
                        src={pieceimg[value - 1]}
                        id={String.fromCharCode(65 + ridx) + (cidx + 1)}
                        className="animal_img"
                        onDragStart={(e) => dragStart(e)}
                        onDragEnd={(e) => dragEnd(e)}
                        draggable={start && turn}
                        alt={value}
                    ></img>
                </div>
            );
        } else {
            return (
                <div
                    className="animalpiece"
                    id={String.fromCharCode(65 + ridx) + (cidx + 1)}
                    value={-value}
                >
                    <img
                        src={pieceimg_blue[-value - 1]}
                        id={String.fromCharCode(65 + ridx) + (cidx + 1)}
                        draggable={start && turn}
                        onDragStart={(e) => dragStart(e)}
                        onDragEnd={(e) => dragEnd(e)}
                        className="animal_img"
                        alt={value}
                    ></img>
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
            >
                {toggle ? (
                    <span className="notation">
                        {String.fromCharCode(65 + ridx) + (cidx + 1)}
                    </span>
                ) : null}
            </div>
        );
    }
}
