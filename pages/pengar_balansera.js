import { Button, ButtonGroup, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import times from "lodash/times";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Seesaw from "./components/Seesaw";


const nrOfTasks = 10;

// random int array from min (inclusive) to max (exclusive)
const randInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const createMoney = ({ five = 0, ten = 0, twenty = 0 } = {}) => ({
    five,
    ten,
    twenty,
    get sum() {
        return this.five * 5 + this.ten * 10 + this.twenty * 20
    },
    plusFive() {
        return createMoney({ ...this, five: this.five + 1, });
    },
    plusTen() {
        return createMoney({ ...this, ten: this.ten + 1 });
    },
    plusTwenty() {
        return createMoney({ ...this, twenty: this.twenty + 1 });
    }
});

const randMoney = (maxSum) => {
    const money = createMoney();
    if (maxSum < 5) return money;

    const value = [5, 10, 20];
    const moneyKey = ["five", "ten", "twenty"];

    const maxLoops = 10;

    for (let i = 0; i < maxLoops && money.sum < maxSum; ++i) {
        const moneyType = randInt(0, 3);

        if (money.sum + value[moneyType] > maxSum) {
            continue;
        }
        if (money.sum > 0 && Math.random() < 0.05) {
            break;
        }

        money[moneyKey[moneyType]]++;
    }

    return money;
}

const rightMoney = [...Array(nrOfTasks)].map(() => randMoney(randInt(50, 100)))

export default function Easy() {
    const [flip, setFlip] = useState(false);
    const [correct, setCorrect] = useState(null);
    const [check, setCheck] = useState(false);
    const [taskNumber, setTaskNumber] = useState(0);

    const totRight = rightMoney[taskNumber].sum;
    const [leftMoney, setLeftMoney] = useState(randMoney(totRight));

    const checkAnswer = (answer) => {
        const totLeft = leftMoney.sum;

        if (!check) {
            const less = totLeft < totRight;
            const equal = totLeft === totRight;
            const greater = totLeft > totRight;

            const correct =
                less && answer === "less" ||
                equal && answer === "equal" ||
                greater && answer === "greater";

            setCheck(true);
            setCorrect(correct);
            setFlip(less ? "right" : greater ? "left" : false);
        } else {
            alert("Du har redan valt ett alternativ")
        }
    };

    const addMoney = (value) => {
        if (value === "twenty") {
            setLeftMoney(leftMoney.plusTwenty());
        } else if (value === "ten") {
            setLeftMoney(leftMoney.plusTen());
        } else if (value === "five") {
            setLeftMoney(leftMoney.plusFive());
        } else {
            console.error('Cannot add other money than "five", "ten" or "twenty"')
        }
    }

    const nextTask = () => {
        if (check) {
            const nextTaskNumber = (taskNumber + 1) % nrOfTasks;
            if (nextTaskNumber === 0) {
                alert("Du har gjort alla uppgifter!");
            }
            setTaskNumber(nextTaskNumber);
            if (rightMoney[nextTaskNumber].sum >= 50) {
                setLeftMoney(randMoney(rightMoney[nextTaskNumber].sum - 25))
            } else if(rightMoney[nextTaskNumber].sum >= 25){
                setLeftMoney(randMoney(rightMoney[nextTaskNumber].sum - 10))
            } else {
                setLeftMoney(randMoney(rightMoney[nextTaskNumber].sum))
            }
            setFlip(false);
            setCorrect(null);
            setCheck(false);
        } else {
            alert("Välj ett alternativ först");
        }
    }

    const resetValues = () => {
        setTaskNumber(0);
        setLeftMoney(randMoney(rightMoney[taskNumber].sum));
        setCheck(false);
        setFlip(false);
        setCorrect(null);
    }

    const restartGame = () => {
        setTaskNumber(0);
        setCheck(false);
        setLeftMoney(randMoney(rightMoney[taskNumber].sum));
        setFlip(false);
        setCorrect(null);
    }


    return (
        <>
        <center>
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
                    {times(leftMoney.twenty)
                        .map((i_1) => <div key={i_1}><Image src="/tjugolapp.jpg" layout="fixed" width={75} height={45} alt="Tjugolapp" quality={50} /></div>)}
                    {times(leftMoney.ten)
                        .map((i_2) => <div key={i_2}><Image src="/tiokrona.png" layout="fixed" width={35} height={35} alt="Tiokrona" quality={50} /></div>)}
                    {times(leftMoney.five)
                        .map((i_3) => <div key={i_3}><Image src="/femkrona.png" layout="fixed" width={40} height={40} alt="Femkrona" quality={50} /></div>)}
                </Seesaw.Left>
                <Seesaw.Right>
                    {times(rightMoney[taskNumber].twenty)
                        .map((i_4) => <div key={i_4}><Image src="/tjugolapp.jpg" layout="fixed" width={75} height={45} alt="Tjugolapp" quality={50} /></div>)}
                    {times(rightMoney[taskNumber].ten)
                        .map((i_5) => <div key={i_5}><Image src="/tiokrona.png" layout="fixed" width={35} height={35} alt="Tiokrona" quality={50} /></div>)}
                    {times(rightMoney[taskNumber].five)
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