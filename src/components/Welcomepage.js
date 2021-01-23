import React, {useEffect,useState } from "react";
import {Link} from "react-router-dom";
import Header  from "./Header";
import Footer from "./Footer";
import './Welcomepage.css';

import Jungle from "../assets/Jungle.jpg";

import socket from "../connection/Socket";

import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';


function Welcomepage({userName , setUserName, setRoomId ,setHost}){

    

    function randomId(){
        return Math.floor(Math.random() * (10000 - 20 + 1)) + 20;
    }

    const [connect, setConnect] = useState(true)

    const [openC , setOpenC] = useState(false)
    const [openJ , setOpenJ] = useState(false)
    const roomID = React.useRef();
    
    const handleCloseC = () =>{
        setOpenC(false);
    }

    const handleEnterC = () =>{
        let getroomId = randomId();
        if(roomID.current.value != ""){
            getroomId = roomID.current.value;
        }
        setRoomId(getroomId)
        let parms = {'userName' : userName , 'roomId' : String(getroomId)};
        socket.emit('create',parms);
        socket.on('getRoomId_create',data =>{
            setRoomId(data['roomId'])
        })
        setHost(1);
        setOpenC(false);
    } 

    const handleCloseJ = () =>{
        setOpenJ(false);
    }

    const handleEnterJ = () =>{
        let getroomId = randomId();
        if(roomID.current.value != ""){
            getroomId = roomID.current.value;
        }
        setRoomId(getroomId)
        let parms = {'userName' : userName , 'roomId' : String(getroomId)};
        socket.emit('join',parms);
        socket.on('getRoomId_join',data =>{
            setRoomId(data['roomId'])
        })
        setOpenJ(false);
    } 

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
        setOpenJ(true);
        // let getroomId = prompt("Enter the Room ID: ","Type here (Will Create New Room if leave Empty or Cancel)")
        // if (getroomId == null || getroomId == "Type here (Will Create New Room if leave Empty or Cancel)"){
        //     getroomId = randomId();
        // }
        // setRoomId(getroomId);
        // let parms = {'userName' : userName , 'roomId' : String(getroomId) };
        // socket.emit('join',parms);
        // socket.on('getRoomId_join',data =>{
        //     setRoomId(data['roomId'])
        // })

    }

    const create_room = () => {
        setOpenC(true);
        // let getroomId = prompt("Create a Room ID: ","Type here (Will Create New Room if leave Empty or Cancel)")
        // if (getroomId == null || getroomId == "Type here (Will Create New Room if leave Empty or Cancel)"){
        //     getroomId = randomId();
        // }
        // setRoomId(getroomId);
        // let parms = {'userName' : userName , 'roomId' : String(getroomId)};
        // socket.emit('create',parms);
        // socket.on('getRoomId_create',data =>{
        //     setRoomId(data['roomId'])
        // })
        // setHost(1);
    }


    return(
        <div className = "grid-container" style={{height:'100vh'}}>

            <div style={{position:'absolute',top:'0px',opacity:'0.5',zIndex:'-1'}}>
                <img src={Jungle} alt='background pic' style={{height:'100vh',width:'100%',objectFit:'cover',pointerEvents:'none'}}/>
            </div>          

            <Dialog open={openC} onClose={handleCloseC}>
                <DialogTitle>Enter Room ID:</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Will Create Random ID if Empty
                    </DialogContentText>
                    <TextField
                        inputRef={roomID}
                        autoFocus
                        margin="dense"
                        label="Room ID"
                        placeholder="Type Here"
                        fullWidth
                    />
                    <DialogActions>
                        <Button onClick={handleCloseC} color="primary">
                            Cancel
                        </Button>
                        <Link to ="/home"><Button onClick={handleEnterC} color="primary">
                            Enter
                        </Button></Link>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Dialog open={openJ} onClose={handleCloseJ}>
                <DialogTitle>Enter Room ID:</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Randomly Create a Room if Empty
                    </DialogContentText>
                    <TextField
                        inputRef={roomID}
                        autoFocus
                        margin="dense"
                        label="Room ID"
                        placeholder="Type Here"
                        fullWidth
                    />
                    <DialogActions>
                        <Button onClick={handleCloseJ} color="primary">
                            Cancel
                        </Button>
                        <Link to ="/home"><Button onClick={handleEnterJ} color="primary">
                            Enter
                        </Button></Link>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <Header />
            <div className ="grid-login">
                <form className = "welcomepage_form">
                    Create Your Username :<br></br> 
                    {/* <input type="text" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} disabled = {!connect} placeholder= "Random if blank" className ="Username" onChange = {handleChange} /> */}
                    <Input type="text" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} disabled = {!connect} placeholder= "Random if blank" className ="Username" onChange = {handleChange} />
                </form>
                <Button style={{backgroundColor:'white'}} size = "large" variant="outlined" className = "create_room" onClick = {create_room} disabled = {!connect} >Create Room</Button>
                <Button style={{backgroundColor:'white'}} size = "large" variant="outlined" className = "join_room" onClick = {join_room} disabled = {!connect}>Join Room</Button>
                <div>Current Rooms: </div>
                <Button style={{backgroundColor:'white'}} onClick = {()=>window.location.reload()}>refresh</Button>
            </div>
            <Footer />

            
        </div>

    )

}

export default Welcomepage;