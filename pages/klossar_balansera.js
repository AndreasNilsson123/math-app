import { Button, ButtonGroup, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Link from "next/link";
import { useState } from "react";
import Seesaw from "./components/Seesaw";
import times from "lodash/times";

//constants
const nrOfTasks = 10;
let taskNumber = 0;
let check = false;

let firstLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (5)) + 1);
let secondLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (5)) + 1);
let firstRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (5)) + 1);
let secondRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (5)) + 1);

/* ---    Randomize side to be emmpty      --- */
const randomSide = () => {
    secondLeft[taskNumber] = [];

    if(firstLeft[taskNumber] >= firstRight[taskNumber] + secondRight[taskNumber]){
        firstLeft[taskNumber] = Math.floor(Math.random() * (firstRight[taskNumber]+secondRight[taskNumber]-1)) + 1;
    }
}
/* --- Choice setup --- */
function choiceBox() {
    let answers = [0, 0, 0]
    let correctAnswerIndex = Math.floor(Math.random() * (3));
    answers[correctAnswerIndex] = Math.abs(firstLeft[taskNumber] + secondLeft[taskNumber] - firstRight[taskNumber] - secondRight[taskNumber]);
    if (correctAnswerIndex === 0) {
        answers[1] = Math.floor(Math.random() * (7)) + 1;
        answers[2] = Math.floor(Math.random() * (7)) + 1;
        if(answers[1]===answers[0]){
            answers[1]++;
        } else if(answers[2]===answers[0]){
            answers[2]++;
        }
    } else if (correctAnswerIndex === 1) {
        answers[0] = Math.floor(Math.random() * (7)) + 1;
        answers[2] = Math.floor(Math.random() * (7)) + 1;
        if(answers[0]===answers[1]){
            answers[0]++;
        } else if(answers[2]===answers[1]){
            answers[2]++;
        }
    } else {
        answers[0] = Math.floor(Math.random() * (7)) + 1;
        answers[1] = Math.floor(Math.random() * (7)) + 1;
        if(answers[0]===answers[2]){
            answers[0]++;
        } else if(answers[1]===answers[2]){
            answers[1]++;
        }
    }
    return answers;
}


randomSide();
let answer = choiceBox();

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
                answer = choiceBox();
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
                <h1>Klossar</h1>
                <h4>Välj ett alternativ för att balansera vågen!</h4>
                    <ButtonGroup variant="contained" color="primary" orientation="vertical" size="large">
                        <Button onClick={() => checkNumber(answer[0])}>1.</Button>
                        <Button onClick={() => checkNumber(answer[1])}>2.</Button>
                        <Button onClick={() => checkNumber(answer[2])}>3.</Button>
                    </ButtonGroup>

                    <ButtonGroup variant="contained" color="disabled" orientation="vertical" size="large">
                        <Button>{times(answer[0])
                            .map((i) => <div key={i}>⬛</div>)}</Button>
                        <Button>{times(answer[1])
                            .map((i) => <div key={i}>⬛</div>)}</Button>
                        <Button>{times(answer[2])
                            .map((i) => <div key={i}>⬛</div>)}</Button>
                    </ButtonGroup>

                <br />

                <Seesaw flip={flip}>
                    <Seesaw.Left>
                        {times(firstLeft[taskNumber] + secondLeft[taskNumber])
                            .map((i) => <div key={i}>⬛</div>)}
                    </Seesaw.Left>
                    <Seesaw.Right>
                        {times(firstRight[taskNumber] + secondRight[taskNumber])
                            .map((i) => <div key={i}>🟫</div>)}
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