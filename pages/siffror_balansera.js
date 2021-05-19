import { Button, ButtonGroup, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Link from "next/link";
import { useState } from "react";
import Seesaw from "./components/Seesaw";

//constants
const nrOfTasks = 10;
let taskNumber = 0;
let check = false;

let firstLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
let secondLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
let firstRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
let secondRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);

/* ---    Manipulate values so addition can work    --- */
const fixSides = () => {
        if (firstLeft[taskNumber] > firstRight[taskNumber] + secondRight[taskNumber]) {
            firstLeft[taskNumber] = Math.floor(Math.random() * (firstRight[taskNumber] + secondRight[taskNumber] - 1) + 1);
        }
        if (firstLeft[taskNumber] + 9 < firstRight[taskNumber] + secondRight[taskNumber]) {
            firstRight[taskNumber] = Math.floor(Math.random() * Math.trunc((firstLeft[taskNumber] + 9) / 2) + 1);
            secondRight[taskNumber] = Math.floor(Math.random() * Math.trunc((firstLeft[taskNumber] + 9) / 2) + 1);
        }
}

/* ---    Randomize side to be emmpty      --- */
const randomSide = () => {
    secondLeft[taskNumber] = [];
}

randomSide();
fixSides();


export default function Easy() {
    const [flip, setFlip] = useState(false);
    const [correct, setCorrect] = useState(null);

    /* ---    Check Number given by the buttons with checkAnswer    --- */
    const checkNumber = (number) => {
        secondLeft[taskNumber] = number;
        let totLeft = firstLeft[taskNumber] + secondLeft[taskNumber];
        let totRight = firstRight[taskNumber] + secondRight[taskNumber];
        checkAnswer("equal", totLeft, totRight);
    }

    /* ---    Check answer    --- */
    const checkAnswer = (answer, totLeft, totRight) => {
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
            setFlip(less ? "right" : greater ? "left" : false)
        } else {
            choiceWarning = true;
            alert("Du har redan valt ett alternativ");
        }
    }

    /* --- Set up for next task --- */
    const nextTask = () => {
        if (check === true) {
            if (taskNumber < nrOfTasks - 1) {
                setCorrect(null);
                setFlip(false);
                taskNumber++;
                check = false;
                randomSide();
                fixSides();
            } else {
                setCorrect(null);
                setFlip(false);
                taskNumber = 0;
                alert("Du har gjort alla uppgifter!");
                check = false;
                randomSide();
            }
        } else {
            alert("Välj ett alternativ först");
        }
    }

    /* ---    Reset values when going back to menu     --- */
    const resetValues = () => {
        taskNumber = 0;
        check = false;
        randomSide();
    }

    /* ---    Restart game when pressing "Nollställ"     --- */
    const restartGame = () => {
        location.reload();
    }



    return (
        <>
            <center>
                <h1>Siffror</h1>
                <h4>Balansera vågen!</h4>
                    <div className="ingamebtnlayout">
                        <Button variant="contained" color="primary" onClick={() => checkNumber(0)} id="ingamebtn">0</Button>
                        <Button variant="contained" color="primary" onClick={() => checkNumber(1)} id="ingamebtn">1</Button>
                        <Button variant="contained" color="primary" onClick={() => checkNumber(2)} id="ingamebtn">2</Button>
                        <Button variant="contained" color="primary" onClick={() => checkNumber(3)} id="ingamebtn">3</Button>
                        <Button variant="contained" color="primary" onClick={() => checkNumber(4)} id="ingamebtn">4</Button>
                        <Button variant="contained" color="primary" onClick={() => checkNumber(5)} id="ingamebtn">5</Button>
                        <Button variant="contained" color="primary" onClick={() => checkNumber(6)} id="ingamebtn">6</Button>
                        <Button variant="contained" color="primary" onClick={() => checkNumber(7)} id="ingamebtn">7</Button>
                        <Button variant="contained" color="primary" onClick={() => checkNumber(8)} id="ingamebtn">8</Button>
                        <Button variant="contained" color="primary" onClick={() => checkNumber(9)} id="ingamebtn">9</Button>
                    </div>

                <br />

                <Seesaw flip={flip}>
                    <Seesaw.Left>
                        <div>{firstLeft[taskNumber]}+{secondLeft[taskNumber]}</div>
                    </Seesaw.Left>
                    <Seesaw.Right>
                        <div>{firstRight[taskNumber]}+{secondRight[taskNumber]}</div>
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

                {correct == null &&
                    <br />
                }
            </center>

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