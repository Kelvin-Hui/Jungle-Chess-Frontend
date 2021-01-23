import React, {useEffect,useState } from "react";
import {Link} from "react-router-dom";
import Header  from "./Header";
import Footer from "./Footer";
import './Welcomepage.css';


import socket from "../connection/Socket";

import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";



function Welcomepage({userName , setUserName, setRoomId ,setHost}){

    

    function randomId(){
        return Math.floor(Math.random() * (10000 - 20 + 1)) + 20;
    }

    const [connect, setConnect] = useState(true)

    // useEffect(()=>{
    //     if(!socket.connected){
    //         alert("Sorry Too Many People Connected / Lost Connection :( \nRefresh or Please Try Again Later")
    //         setConnect(false)
    //     }
    // },[])
    
    
    const handleChange = (e) => {
        e.preventDefault();
        setUserName(e.target.value)
    }

    

    const join_room = () => {
        let getroomId = prompt("Enter the Room ID: ","Type here (Will Create New Room if leave Empty or Cancel)")
        if (getroomId == null || getroomId == "Type here (Will Create New Room if leave Empty or Cancel)"){
            getroomId = randomId();
        }
        setRoomId(getroomId);
        let parms = {'userName' : userName , 'roomId' : String(getroomId) };
        socket.emit('join',parms);
        socket.on('getRoomId_join',data =>{
            setRoomId(data['roomId'])
        })
    }

    const create_room = () => {
        let getroomId = prompt("Create a Room ID: ","Type here (Will Create New Room if leave Empty or Cancel)")
        if (getroomId == null || getroomId == "Type here (Will Create New Room if leave Empty or Cancel)"){
            getroomId = randomId();
        }
        setRoomId(getroomId);
        let parms = {'userName' : userName , 'roomId' : String(getroomId)};
        socket.emit('create',parms);
        socket.on('getRoomId_create',data =>{
            setRoomId(data['roomId'])
        })
        setHost(1);
    }


    return(
        <div className = "grid-container" style={{height:`${window.innerHeight}px`}}>
            <Header />
            <div className ="grid-login">
                <form className = "welcomepage_form">
                    Enter Your Username :<br></br> 
                    {/* <input type="text" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} disabled = {!connect} placeholder= "Random if blank" className ="Username" onChange = {handleChange} /> */}
                    <Input type="text" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} disabled = {!connect} placeholder= "Random if blank" className ="Username" onChange = {handleChange} />
                </form>
                <Link to="/home"><Button size = "Large" variant="outlined" className = "create_room" onClick = {create_room} disabled = {!connect} >Create Room</Button></Link>
                <Link to="/home"><Button size = "Large" variant="outlined" className = "join_room" onClick = {join_room} disabled = {!connect}>Join Room</Button></Link>
                <div>Current Rooms: </div>
                <Button onClick = {()=>window.location.reload()}>refresh</Button>
            </div>
            <Footer />
        </div>

    )

}

export default Welcomepage;