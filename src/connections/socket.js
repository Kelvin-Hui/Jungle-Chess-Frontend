import io from "socket.io-client";

const domain = "https://animalchessdemo.herokuapp.com/";
let socket = io.connect(domain);

export default socket;
