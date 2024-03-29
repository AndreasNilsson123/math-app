import { Button, ButtonGroup, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Link from "next/link";
import { useState } from "react";
import Seesaw from "./components/Seesaw";



const nrOfTasks = 10;
let taskNumber = 0;
let check = false;

const firstLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (4)) + 1);
const secondLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (3)) + 4);
const firstRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (4)) + 1);
const secondRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (3)) + 4);

export default function Easy() {
    const [flip, setFlip] = useState(false);
    const [correct, setCorrect] = useState(null);

    let totLeft = firstLeft[taskNumber] * secondLeft[taskNumber];
    let totRight = firstRight[taskNumber] * secondRight[taskNumber];

    const checkAnswer = (answer) => {
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

    return (
        <>
        <center>
            <h1>Multiplikation</h1>

            <div className="ingamebtnlayout">
                <Button variant="contained" color="primary" onClick={() => checkAnswer("greater")} id="ingamebtn">&gt;</Button>
                <Button variant="contained" color="primary" onClick={() => checkAnswer("equal")} id="ingamebtn">=</Button>
                <Button variant="contained" color="primary" onClick={() => checkAnswer("less")} id="ingamebtn">&lt;</Button>
            </div>

            <br />

            <Seesaw flip={flip}>
                <Seesaw.Left>
                    <div>{firstLeft[taskNumber]}*{secondLeft[taskNumber]}</div>
                </Seesaw.Left>
                <Seesaw.Right>
                    <div>{firstRight[taskNumber]}*{secondRight[taskNumber]}</div>
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
            
            </ center>

            <br />


            <div>
                <Link href="/">
                    <Button onClick={() => resetValues()}>Tillbaka</Button>
                </Link>

                <Button onClick={() => {
                    setCorrect(null);
                    setFlip(false);
                    resetValues();
                }}>
                    Nollställ
        </Button>

                <Button onClick={() => nextTask()}>Nästa uppgift</Button>
            </div>

        </>
    );
}