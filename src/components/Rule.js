import React from "react";
import example from "../assets/example.png";

export default function Rule() {
    const Rank_Piece = [
        ["Elephant", 8],
        ["Lion", 7],
        ["Tiger", 6],
        ["Leopard", 5],
        ["Wolf", 4],
        ["Dog", 3],
        ["Cat", 2],
        ["Rat", 1],
    ];
    window.onclick = function (event) {
        let modal = document.getElementsByClassName("modal_rule")[0];
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    return (
        <div className="modal_rule">
            <div className="modal_content" style={{ width: "75vw" }}>
                <h1>Rules : </h1>

                <p>
                    The Jungle gameboard consists of seven columns and nine rows
                    of squares (7×9 rectangle = 63 squares). Pieces move on the
                    squares as in chess. Pictures of eight animals and their
                    names appear on each side of the board to indicate initial
                    placement of the game pieces.
                </p>

                <ul style={{ textAlign: "start" }}>
                    <img
                        src={example}
                        alt="exmaple"
                        style={{ float: "right" }}
                    />
                    <li>
                        - Each Player Has One <b>Den</b> Square Located In The
                        Centre Of Their First Row Of The Board
                    </li>
                    <li>
                        - Three <b>Traps</b> Border Each Den, To Each Side And
                        In Front.
                    </li>
                    <li>
                        - Two <b>Rivers</b> Are Located In The Centre Of The
                        Board, Each Comprising 6 Squares In A 2×3 Rectangle.
                        There Are Single Columns Of Ordinary Land Squares On The
                        Edges Of The Board, And Down The Middle Between The
                        Rivers.
                    </li>
                    <table>
                        <tr>
                            <th>Rank</th>
                            <th>Piece</th>
                        </tr>
                        {Rank_Piece.map((row, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{row[0]}</td>
                                    <td>{row[1]}</td>
                                </tr>
                            );
                        })}
                    </table>
                    <h3>
                        <b>Movement</b>
                    </h3>
                    <div>
                        Players alternate moves with <b>Red</b> moving first.
                        During their turn, a player must move. All pieces can
                        move one square horizontally or vertically (not
                        diagonally). A piece may not move into its own den.
                        Animals of either side can move into and out of any trap
                        square.
                        <p>
                            There are special rules related to the water
                            squares:
                        </p>
                        <li>
                            <b>
                                - The rat is the only animal that may go onto a
                                water square.
                            </b>
                        </li>
                        <li>
                            <b>
                                - The lion and tiger can jump over a river
                                horizontally or vertically. They jump from a
                                square on one edge of the river to the next
                                non-water square on the other side.
                            </b>
                            If that square contains an enemy piece of equal or
                            lower rank, the lion or tiger capture it as part of
                            their jump. A jumping move is blocked (not
                            permitted) if a rat of either color currently
                            occupies any of the intervening water squares.
                        </li>
                    </div>
                    <h3>
                        <b>Capturing</b>
                    </h3>
                    <div>
                        Animals capture opponent pieces by "killing/eating" them
                        (the attacking piece replaces the captured piece on its
                        square; the captured piece is removed from the game). A
                        piece can capture any enemy piece that has the same or
                        lower rank, with the following exceptions:
                        <p>
                            <li>
                                <b>
                                    - The rat can "kill" (capture) an elephant,
                                    but only from a land square, not from a
                                    water square
                                </b>
                            </li>
                            <li>
                                <b>
                                    - A rat in the water is invulnerable to
                                    capture by any piece on land.
                                </b>
                                (Therefore a rat in the water can only be killed
                                by another rat in the water.)
                            </li>
                            <li>
                                <b>
                                    - A piece that enters one of the opponent's
                                    trap squares is reduced in rank to 0.
                                </b>
                                Thus the trapped piece may be captured by the
                                defending side with any piece, regardless of
                                rank. A trapped piece has its normal rank
                                restored when it exits an opponent's trap
                                square.
                            </li>
                        </p>
                    </div>
                </ul>
            </div>
        </div>
    );
}
