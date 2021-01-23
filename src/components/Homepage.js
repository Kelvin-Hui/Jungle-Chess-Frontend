import React, {useState} from "react";
import './Homepage.css';
import Header  from "./Header";
import Footer from "./Footer";
import Log from "./Log";
import Chat from "./Chat";
import Game from "./Game"
import socket from"../connection/Socket";
import { Redirect } from "react-router";

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import Jungle from "../assets/Jungle.jpg";

function Homepage({userName , roomId , isHost}){


    const [gamestarts , setgamestarts] = useState(false);
    const [oppoent, setOppoent] = useState("Waiting Someone to Join ...")
    const [successSnackOpen,SetSuccessSnackOpen] = useState(false);
    
    window.onpopstate=()=>{
        // socket.emit("leave",{'userName':userName});
        socket.disconnect()
    }


    const handleSuccessClose=()=>{
        SetSuccessSnackOpen(false)
    }

    socket.off('getOppoent').on("getOppoent", data=>{
        let name = data['Oppoent']
        if(isHost==1){
            setOppoent(name[1])
        }
        else{
            setOppoent(name[0])
        }
        // alert("Game Start! Enjoy :D ")
        SetSuccessSnackOpen(true)
        setgamestarts(true)
    })

    
    if (roomId !== ""){
        return(
            <div className = "grid-container2" style={{height:'100vh', overflow: 'hidden'}}>

                <div style={{position:'absolute',top:'0px',opacity:'0.3',zIndex:'-1'}}>
                    <img src={Jungle} alt='background pic' style={{height:'100vh',width:'100%',objectFit:'cover',pointerEvents:'none'}}/>
                </div>

                <Snackbar open={successSnackOpen} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000} onClose={handleSuccessClose}>
                    <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSuccessClose}>Game Start! Enjoy :D (The Host a.k.a Red will Start First)</MuiAlert>  
                </Snackbar>


                <Header />
                <Game 
                    userName = {userName}
                    oppoent = {oppoent}
                    roomId = {roomId}
                    gamestarts={gamestarts}
                    isHost={isHost}
                />
                <Log />
                <Chat
                    userName = {userName}
                    oppoent = {oppoent}
                />
                <Footer />
            </div>
        )
    }
    else{
        return(
            <Redirect to = "/" />
        )
    }
}
export default Homepage;