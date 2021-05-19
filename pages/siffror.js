import { Button, ButtonGroup, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Link from "next/link";
import { useState } from "react";
import Seesaw from "./components/Seesaw";



const nrOfTasks = 10;
let taskNumber = 0;
let check = false;
var sign;

const firstLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
const secondLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
const firstRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
const secondRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
console.log(firstLeft, secondLeft, firstRight, secondRight);

const fixSides = () => {
    if (firstLeft[taskNumber] < secondLeft[taskNumber] && sign === "-") {
        let tempLeft = firstLeft[taskNumber];
        firstLeft[taskNumber] = secondLeft[taskNumber];
        secondLeft[taskNumber] = tempLeft
    }
    if (firstRight[taskNumber] < secondRight[taskNumber] && sign === "-") {
        let tempRight = firstRight[taskNumber];
        firstRight[taskNumber] = secondRight[taskNumber];
        secondRight[taskNumber] = tempRight;
    }
}

const randomSign = () => {
    let randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber === 0) {
        sign = "+";
    } else {
        sign = "-";
    }
    fixSides();
}
randomSign();

export default function Easy() {
    const [flip, setFlip] = useState(false);
    const [correct, setCorrect] = useState(null);


    const checkAnswer = (answer) => {
        let totLeft, totRight;
        if (sign === "+") {
            totLeft = firstLeft[taskNumber] + secondLeft[taskNumber];
            totRight = firstRight[taskNumber] + secondRight[taskNumber];
        } else {
            totLeft = firstLeft[taskNumber] - secondLeft[taskNumber];
            totRight = firstRight[taskNumber] - secondRight[taskNumber];
        }
        console.log(totLeft, totRight);
        if (check === false) {
            check = true;
            const less = totLeft < totRight;
            const equal = totLeft === totRight;
            const greater = totLeft > totRight;

            const correct =
                less && answer === "less" ||
                equal && answer === "equal" ||
                greater && answer === "greater";

            setCorrect(correct);
            setFlip(less ? "right" : greater ? "left" : false);
        } else {
            alert("Du har redan valt ett alternativ");
        }
    }

    const nextTask = () => {
        if (check === true) {
            if (taskNumber < nrOfTasks - 1) {
                setCorrect(null);
                setFlip(false);
                taskNumber++;
                check = false;
                randomSign();
            } else {
                setCorrect(null);
                setFlip(false);
                taskNumber = 0;
                alert("Du har gjort alla uppgifter!");
                check = false;
            }
        } else {
            alert("Välj ett alternativ först");
        }
    }

    const resetValues = () => {
        taskNumber = 0;
        check = false;
    }

    const restartGame = () => {
        location.reload();
    }

    return (
        <>
            <center>
            <h1>Siffror</h1>

            <div className="ingamebtnlayout">
                <Button variant="contained" color="primary" onClick={() => checkAnswer("greater")} id="ingamebtn">&gt;</Button>
                <Button variant="contained" color="primary" onClick={() => checkAnswer("equal")} id="ingamebtn">=</Button>
                <Button variant="contained" color="primary" onClick={() => checkAnswer("less")} id="ingamebtn">&lt;</Button>
            </div>

            <br />

            <Seesaw flip={flip}>
                <Seesaw.Left>
                    <div>{firstLeft[taskNumber]}{sign}{secondLeft[taskNumber]}</div>
                </Seesaw.Left>
                <Seesaw.Right>
                    <div>{firstRight[taskNumber]}{sign}{secondRight[taskNumber]}</div>
                </Seesaw.Right>
            </Seesaw>

            <br />

            <LinearProgress variant="determinate" value={(taskNumber + 1) / nrOfTasks * 100} />

            <br />

            {correct != null &&
                <Alert severity={correct ? "success" : "info"}>
                    {correct ? "Rätt svar!" : "Tyvärr, fel svar."}
                </Alert>
            }
            </center>

            <br />


            <div>
                <Link href="/">
                    <Button onClick={() => resetValues()}>Tillbaka</Button>
                </Link>

                <Button onClick={() => restartGame()}>Nollställ</Button>

                <Button onClick={() => nextTask()}>Nästa uppgift</Button>
            </div>

        </>
    );
}