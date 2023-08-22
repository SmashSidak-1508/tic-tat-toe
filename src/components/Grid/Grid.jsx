import { useState } from "react";
import Card from "../Card/Card1"
import './Grid.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import isWinner from "../../helpers/Win";



function Grid({numberOfCards}){
    const [turn, setTurn]=useState(true); // false -> player X , true -> player Y
    const [board , setBoard] = useState(Array(numberOfCards).fill(""));
    const [winner , setWinner] = useState(null);


function play(index){
    console.log("move played",index);
    if(turn ==  true){
        board[index] = "O";
    }
    else{
        board[index]="X";
    }
    const win = isWinner(board, turn ? "O":"X");
    console.log("winner is",win);
    if(win){
        setWinner(win);
        toast.success(`congratulations ${win} won the game!!!`)
    }
    setBoard([... board]);
    setTurn(!turn);
}

function reset(){
    setBoard(Array(numberOfCards).fill(""));
    setWinner(null);
    setTurn(true);
}
    return(
        <div className="grid-wrapper">
        {winner &&( 
            <>
        <h1 className="highlight">Winner is {winner}</h1>
            <button className="reset" onClick={reset}>Reset Game</button>
            <ToastContainer position="top-center"/>
            </>
        )
        }
        <h1 className="highlight"> Current Turn: {(turn) ? 'O' :'X'}</h1>
        <div className="grid">
        {board.map((value,idx)=>{
            return <Card gameEnd={winner ? true : false} onPlay = {play} player = {value}  key = {idx} index = {idx} />
        })}
        </div>
        </div>
    )

}
export default Grid;