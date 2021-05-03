import { Button, ButtonGroup, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Link from "next/link";
import { useState } from "react";
import Seesaw from "../components/Seesaw";

//constants
const nrOfTasks = 4;
let taskNumber = 0;
let check = false;

let firstLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
let secondLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
let firstRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
let secondRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);

firstLeft[taskNumber] = 1;
firstRight[taskNumber] = 9;

/* ---    Manipulate values so addition can work    --- */
const fixSides = () => {
    if (secondLeft[taskNumber].length === 0) {
        if (firstLeft[taskNumber] > firstRight[taskNumber] + secondRight[taskNumber]) {
            firstLeft[taskNumber] = Math.floor(Math.random() * (firstRight[taskNumber] + secondRight[taskNumber] - 1) + 1);
        }
        if (firstLeft[taskNumber] + 9 < firstRight[taskNumber] + secondRight[taskNumber]) {
            firstRight[taskNumber] = Math.floor(Math.random() * Math.trunc((firstLeft[taskNumber] + 9) / 2) + 1);
            secondRight[taskNumber] = Math.floor(Math.random() * Math.trunc((firstLeft[taskNumber] + 9) / 2) + 1);
        }
    } else {
        if (firstRight[taskNumber] > firstLeft[taskNumber] + secondLeft[taskNumber]) {
            firstLeft[taskNumber] = Math.floor(Math.random() * (firstLeft[taskNumber] + secondLeft[taskNumber] - 1) + 1);
        }
        if (firstRight[taskNumber] + 9 < firstLeft[taskNumber] + secondLeft[taskNumber]) {
            firstLeft[taskNumber] = Math.floor(Math.random() * Math.trunc((firstRight[taskNumber] + 9) / 2) + 1);
            secondLeft[taskNumber] = Math.floor(Math.random() * Math.trunc((firstRight[taskNumber] + 9) / 2) + 1);
        }
    }
}

/* ---    Randomize side to be emmpty      --- */
const randomSide = () => {
    let randomNumber = Math.floor(Math.random() * (2));
    console.log(randomNumber);
    randomNumber = 0;
    if (randomNumber === 0) {
        secondLeft[taskNumber] = [];
    } else {
        secondRight[taskNumber] = [];
    }
}

randomSide();
fixSides();


export default function Easy() {
    const [flip, setFlip] = useState(false);
    const [correct, setCorrect] = useState(null);


    /* ---    Check Number given by the buttons with checkAnswer    --- */
    const checkNumber = (number) => {
        if (secondLeft[taskNumber].length === 0) {
            secondLeft[taskNumber] = number;
        } else {
            secondRight[taskNumber] = number;
        }
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
    }



    return (
        <>
            <h1><center>Siffror</center></h1>
            <h4>Balansera vågen</h4>
            <center>
                <ButtonGroup variant="contained" color="primary" size="large">
                    <Button onClick={() => checkNumber(0)}>0</Button>
                    <Button onClick={() => checkNumber(1)}>1</Button>
                    <Button onClick={() => checkNumber(2)}>2</Button>
                    <Button onClick={() => checkNumber(3)}>3</Button>
                    <Button onClick={() => checkNumber(4)}>4</Button>
                    <Button onClick={() => checkNumber(5)}>5</Button>
                    <Button onClick={() => checkNumber(6)}>6</Button>
                    <Button onClick={() => checkNumber(7)}>7</Button>
                    <Button onClick={() => checkNumber(8)}>8</Button>
                    <Button onClick={() => checkNumber(9)}>9</Button>
                </ButtonGroup>
            </center>
            <br />

            {correct != null &&
                <Alert severity={correct ? "success" : "info"}>
                    {correct ? "Rätt svar!" : "Tyvärr, fel svar."}
                </Alert>
            }


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


            <div>
                <Link href="/">
                    <Button onClick={() => resetValues()}>Tillbaka</Button>
                </Link>

                <Button onClick={() => {
                    setCorrect(null);
                    setFlip(false);
                    taskNumber = 0;
                    check = false;
                    randomSide();
                }}>
                    Nollställ
        </Button>

                <Button onClick={() => nextTask()}>Nästa uppgift</Button>
            </div>

        </>
    );
}