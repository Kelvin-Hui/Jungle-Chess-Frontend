import React from "react";
import Button from "@material-ui/core/Button";

function Footer(){
    return(
        <div className = "grid-footer">
            <div className = 'footer-wrapper'>
                <Button href="https://en.wikipedia.org/wiki/Jungle_(board_game)" target = "_blank">Rule </Button>
                <Button href="https://www.pexels.com/photo/rainforest-during-foggy-day-975771/" target="_blank">Background_Image Source</Button>
                <Button href="https://commons.wikimedia.org/wiki/File:Dou_shou_qi_board.png" target="_blank">Board_Image Source</Button>
            </div>
            
        </div>
    )
}

export default Footer;