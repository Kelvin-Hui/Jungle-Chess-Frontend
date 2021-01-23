import React,{useState} from "react";
import socket from "../connection/Socket";
import "./Log.css"
import Button from "@material-ui/core/Button";

function Log(){

    const [log,setLog] = useState([]);


    const eraseLog = ()=>{
        setLog([])
    }

    socket.off('get_log').on('get_log',data=>{
        setLog([...log, data['logmsg']])
    })

    return(
        <div className ="grid-log">
            <div className ="log-wrapper"style={{height:`${(window.innerHeight * 0.85) - 20 }px`}}>
                <div className = "log-header">
                    Log
                </div>
                <div className = "log-display">
                    {log.length >= 1 &&
                        <ol>
                            {log.map((message)=>{
                                return(
                                    <li>
                                        {message}
                                    </li>
                                )
                            })}
                        </ol>
                    } 
                </div>
                <Button variant = "contained" onClick={eraseLog}>Clear Log</Button>
            </div>
        </div>
    )
}

export default Log;