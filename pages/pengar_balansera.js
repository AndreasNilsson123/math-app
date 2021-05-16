import { Button, ButtonGroup, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import times from "lodash/times";
import Link from "next/link";
import { useState } from "react";
import Seesaw from "./components/Seesaw";
import Image from "next/image";

//[...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1)
const nrOfTasks = 10;

let numFiveLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (3)) + 0);
let numFiveRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (3)) + 1);

let numTenLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (3)) + 0);
let numTenRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (3)) + 1);

let numTwentyLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (2)) + 0);
let numTwentyRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (2)) + 1);

let taskNumber = 0;
let check = false;

let totLeft = numTenLeft[taskNumber] * 10 + numTwentyLeft[taskNumber] * 20 + numFiveLeft[taskNumber] * 5;
let totRight = numTenRight[taskNumber] * 10 + numTwentyRight[taskNumber] * 20 + numFiveRight[taskNumber] * 5;

const fixSides = () => {
    if (totLeft > totRight) {
        numTwentyLeft[taskNumber] = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (numTwentyRight[taskNumber])) + 0);
        numTenLeft[taskNumber] = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (numTenRight[taskNumber])) + 0);
        numFiveLeft[taskNumber] = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (numFiveRight[taskNumber])) + 0);
    }
}

fixSides();

export default function Easy() {
    const [flip, setFlip] = useState(false);
    const [correct, setCorrect] = useState(null);

    const checkAnswer = (answer) => {
        totLeft = numTenLeft[taskNumber] * 10 + numTwentyLeft[taskNumber] * 20 + numFiveLeft[taskNumber] * 5;
        totRight = numTenRight[taskNumber] * 10 + numTwentyRight[taskNumber] * 20 + numFiveRight[taskNumber] * 5;
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
            alert("Du har redan valt ett alternativ")
        }
    };

    const addMoney = (value) => {
        if (value === "twenty") {
            numTwentyLeft[taskNumber]++;
        } else if (value === "ten") {
            numTenLeft[taskNumber]++;
        } else if (value === "five") {
            numFiveLeft[taskNumber]++;
        } else {
            console.log("Error")
            alert("Somthing is wrong")
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
                check = false;
                alert("Du har gjort alla uppgifter!");
            }
        } else {
            alert("Välj ett alternativ först");
        }
        fixSides();
    }

    const resetValues = () => {
        taskNumber = 0;
        check = false;
        fixSides();
    }

    const restartGame = () => {
        location.reload();
    }


    return (
        <>
            <h1>Pengar</h1>

            <ButtonGroup variant="contained" color="primary">
                <Button onClick={() => addMoney("twenty")}><Image src="/tjugolapp.jpg" layout="fixed" width={75} height={45} alt="Tjugolapp" quality={50} /></Button>
                <Button onClick={() => addMoney("ten")}><Image src="/tiokrona.png" layout="fixed" width={35} height={35} alt="Tiokrona" quality={50} /></Button>
                <Button onClick={() => addMoney("five")}><Image src="/femkrona.png" layout="fixed" width={40} height={40} alt="Femkrona" quality={50} /></Button>
                <Button onClick={() => checkAnswer("equal")}>Start</Button>
            </ButtonGroup>

            <br />

            <Seesaw flip={flip}>
                <Seesaw.Left>
                    {times(numTwentyLeft[taskNumber])
                        .map((i_1) => <div key={i_1}><Image src="/tjugolapp.jpg" layout="fixed" width={75} height={45} alt="Tjugolapp" quality={50} /></div>)}
                    {times(numTenLeft[taskNumber])
                        .map((i_2) => <div key={i_2}><Image src="/tiokrona.png" layout="fixed" width={35} height={35} alt="Tiokrona" quality={50} /></div>)}
                    {times(numFiveLeft[taskNumber])
                        .map((i_3) => <div key={i_3}><Image src="/femkrona.png" layout="fixed" width={40} height={40} alt="Femkrona" quality={50} /></div>)}
                </Seesaw.Left>
                <Seesaw.Right>
                    {times(numTwentyRight[taskNumber])
                        .map((i_4) => <div key={i_4}><Image src="/tjugolapp.jpg" layout="fixed" width={75} height={45} alt="Tjugolapp" quality={50} /></div>)}
                    {times(numTenRight[taskNumber])
                        .map((i_5) => <div key={i_5}><Image src="/tiokrona.png" layout="fixed" width={35} height={35} alt="Tiokrona" quality={50} /></div>)}
                    {times(numFiveRight[taskNumber])
                        .map((i_6) => <div key={i_6}><Image src="/femkrona.png" layout="fixed" width={40} height={40} alt="Femkrona" quality={50} /></div>)}
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