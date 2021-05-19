import { Button, ButtonGroup } from "@material-ui/core";
import times from "lodash/times";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Seesaw from "./components/Seesaw";

const randInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
let side;

const createObject = (numberValue, numberValueRight, { moneyFive = 0, moneyTen = 0, moneyTwenty = 0, number = 0, secondNumber = 0 } = {}) => ({
    moneyFive, moneyTen, moneyTwenty,                             //Money objects
    number, secondNumber,                                         //Number objects
    get sum() {
        if(numberValueRight == undefined){
            numberValueRight = 0;
        }
        if(numberValue == undefined){
            numberValue = 0;
        }
        return this.moneyFive * 5 + this.moneyTen * 10 + this.moneyTwenty * 20 + this.number * numberValue + this.secondNumber * numberValueRight;
    },
    get diff() {
        return this.number * numberValue - this.secondNumber * numberValueRight;
    },
    plusMoneyFive() {
        return createObject(0, 0, { ...this, moneyFive: this.moneyFive + 1, });
    },
    plusMoneyTen() {
        return createObject(0, 0, { ...this, moneyTen: this.moneyTen + 1, });
    },
    plusMoneyTwenty() {
        return createObject(0, 0, { ...this, moneyTwenty: this.moneyTwenty + 1 });
    },
    plusNumber(numberValue) {
        return createObject(numberValue, numberValueRight, { ...this, number: this.number = 1 });
    },
    plusSecondNumber(numberValueRight) {
        return createObject(numberValue, numberValueRight, { ...this, secondNumber: this.secondNumber = 1 })
    }
});

const randObject = (maxSum) => {
    const object = createObject();

    if (maxSum < 5) return object;

    const value = [5, 10, 20];
    const objectKey = ["five", "ten", "twenty"];

    const maxLoops = 10;

    for (let i = 0; i < maxLoops && object.sum < maxSum; ++i) {
        const objectType = randInt(0, 3);

        if (object.sum + value[objectType] >= maxSum) {
            continue;
        }

        if (object.sum > 0 && Math.random() < 0.05) {
            break;
        }

        object[objectKey[objectType]]++;
    }

    return object;
}

export default function Easy() {
    const [flip, setFlip] = useState(false);

    const [leftObject, setLeftObject] = useState(randObject(0));
    const [rightObject, setRightObject] = useState(randObject(0));
    const [numberLeft, setLeftNumber] = useState([])
    const [numberRight, setRightNumber] = useState([])
    const [numberSecondLeft, setSecondLeftNumber] = useState([])
    const [numberSecondRight, setSecondRightNumber] = useState([])
    const [operator, setOperator] = useState([])
    const [operatorRight, setOperatorRight] = useState([])


    const checkAnswer = (operator) => {
        let totLeft;
        let totRight;

        if (operator === "+" || operator.length === 0) {
            totLeft = leftObject.sum;
        }
        if (operatorRight === "+" || operatorRight.length === 0) {
            totRight = rightObject.sum;
        }
        if (operator === "-") {
            totLeft = leftObject.diff;
        }
        if (operatorRight === "-") {
            totRight = rightObject.diff;
        }

        const less = totLeft < totRight;
        const greater = totLeft > totRight;

        setFlip(less ? "right" : greater ? "left" : false);
    };

    const addObject = (value, side) => {
        if (value === "moneyTwenty" && side === "left") {
            setLeftObject(leftObject.plusMoneyTwenty());
        }
        if (value === "moneyTen" && side === "left") {
            setLeftObject(leftObject.plusMoneyTen());
        }
        if (value === "moneyFive" && side === "left") {
            setLeftObject(leftObject.plusMoneyFive());
        }
        if (typeof (value) === 'number' && side === "left") {
            setLeftNumber(value);
            setLeftObject(leftObject.plusNumber(value));
        }
        if (typeof (value) === 'number' && side === "2left") {
            setSecondLeftNumber(value);
            setLeftObject(leftObject.plusSecondNumber(value));
        }

        if (value === "moneyTwenty" && side === "right") {
            setRightObject(rightObject.plusMoneyTwenty());
        }
        if (value === "moneyTen" && side === "right") {
            setRightObject(rightObject.plusMoneyTen());
        }
        if (value === "moneyFive" && side === "right") {
            setRightObject(rightObject.plusMoneyFive());
        }
        if (typeof (value) === 'number' && side === "right") {
            setRightNumber(value);
            setRightObject(rightObject.plusNumber(value));
        }
        if (typeof (value) === 'number' && side === "2right") {
            setSecondRightNumber(value);
            setRightObject(rightObject.plusSecondNumber(value));
        }
    }

    const addOperator = (alt, side) => {
        if (alt === "add" && side === "left") {
            setOperator("+")
        }
        if (alt === "sub" && side === "left") {
            setOperator("-")
        }
        if (alt === "add" && side === "right") {
            setOperatorRight("+")
        }
        if (alt === "sub" && side === "right") {
            setOperatorRight("-")
        }
    }

    const resetValues = () => {
        setLeftNumber([]);
        setRightNumber([]);
        setSecondLeftNumber([]);
        setSecondRightNumber([]);
        setOperator([]);
        setOperatorRight([]);
        setLeftObject(randObject(0));
        setRightObject(randObject(0));
        setFlip(false);
    }

    const restartGame = () => {
        setLeftNumber();
        setRightNumber();
        setSecondLeftNumber([]);
        setSecondRightNumber([]);
        setOperator([]);
        setOperatorRight([]);
        setLeftObject(randObject(0));
        setRightObject(randObject(0));
        setFlip(false);
    }


    return (
        <>
            <center>
                <h1>Custom</h1>

                <ButtonGroup variant="contained" color="primary" id="firstpagebtn">
                    <Button onClick={() => addObject("moneyTwenty", side)} id="ingamebtn"><Image src="/tjugolapp.jpg" layout="fixed" width={75} height={45} alt="Tjugolapp" quality={50} /></Button>
                    <Button onClick={() => addObject("moneyTen", side)} id="ingamebtn"><Image src="/tiokrona.png" layout="fixed" width={35} height={35} alt="Tiokrona" quality={50} /></Button>
                    <Button onClick={() => addObject("moneyFive", side)} id="ingamebtn"><Image src="/femkrona.png" layout="fixed" width={40} height={40} alt="Femkrona" quality={50} /></Button>
                </ButtonGroup>

                <br />

                <ButtonGroup variant="contained" color="primary" size="large" id="firstpagebtn">
                    <Button onClick={() => addObject(1, side)} id="ingamebtn">1</Button>
                    <Button onClick={() => addObject(2, side)} id="ingamebtn">2</Button>
                    <Button onClick={() => addObject(3, side)} id="ingamebtn">3</Button>
                    <Button onClick={() => addObject(4, side)} id="ingamebtn">4</Button>
                    <Button onClick={() => addObject(5, side)} id="ingamebtn">5</Button>
                    <Button onClick={() => addObject(6, side)} id="ingamebtn">6</Button>
                    <Button onClick={() => addObject(7, side)} id="ingamebtn">7</Button>
                    <Button onClick={() => addObject(8, side)} id="ingamebtn">8</Button>
                    <Button onClick={() => addObject(9, side)} id="ingamebtn">9</Button>
                    <Button onClick={() => addObject(10, side)} id="ingamebtn">10</Button>
                </ButtonGroup>

                <br />

                <ButtonGroup variant="contained" color="primary" id="firstpagebtn">
                    <Button onClick={() => addOperator("add", "left")} id="ingamebtn">(V) +</Button>
                    <Button onClick={() => addOperator("sub", "left")} id="ingamebtn">(V) -</Button>
                    <Button onClick={() => addOperator("add", "right")} id="ingamebtn">(H) +</Button>
                    <Button onClick={() => addOperator("sub", "right")} id="ingamebtn">(H) -</Button>
                </ButtonGroup>

                <br />

                <ButtonGroup variant="contained" color="secondary" id="firstpagebtn">
                    <Button onClick={() => side = "left"} id="ingamebtn">1:a vänster</Button>
                    <Button onClick={() => side = "2left"} id="ingamebtn">2:a vänster</Button>
                    <Button onClick={() => side = "right"} id="ingamebtn">1:a höger</Button>
                    <Button onClick={() => side = "2right"} id="ingamebtn">2:a höger</Button>
                    <Button onClick={() => checkAnswer(operator)} id="ingamebtn">Starta</Button>
                </ButtonGroup>
                <br />

                <Seesaw flip={flip}>
                    <Seesaw.Left>
                        {times(leftObject.moneyTwenty)
                            .map((i) => <div key={i}><Image src="/tjugolapp.jpg" layout="fixed" width={75} height={45} alt="Tjugolapp" quality={50} /></div>)}
                        {times(leftObject.moneyTen)
                            .map((i) => <div key={i}><Image src="/tiokrona.png" layout="fixed" width={35} height={35} alt="Tiokrona" quality={50} /></div>)}
                        {times(leftObject.moneyFive)
                            .map((i) => <div key={i}><Image src="/femkrona.png" layout="fixed" width={40} height={40} alt="Femkrona" quality={50} /></div>)}
                        {times(leftObject.number)
                            .map((i) => <div key={i}>{numberLeft}</div>)}
                        <div>{operator}</div>
                        {times(leftObject.secondNumber)
                            .map((i) => <div key={i}>{numberSecondLeft}</div>)}

                    </Seesaw.Left>
                    <Seesaw.Right>
                        {times(rightObject.moneyTwenty)
                            .map((i_4) => <div key={i_4}><Image src="/tjugolapp.jpg" layout="fixed" width={75} height={45} alt="Tjugolapp" quality={50} /></div>)}
                        {times(rightObject.moneyTen)
                            .map((i_5) => <div key={i_5}><Image src="/tiokrona.png" layout="fixed" width={35} height={35} alt="Tiokrona" quality={50} /></div>)}
                        {times(rightObject.moneyFive)
                            .map((i_6) => <div key={i_6}><Image src="/femkrona.png" layout="fixed" width={40} height={40} alt="Femkrona" quality={50} /></div>)}
                        {times(rightObject.number)
                            .map((i) => <div key={i}>{numberRight}</div>)}
                        <div>{operatorRight}</div>
                        {times(rightObject.secondNumber)
                            .map((i) => <div key={i}>{numberSecondRight}</div>)}
                    </Seesaw.Right>
                </Seesaw>
            </center>

            <br />

            <div>
                <Link href="/">
                    <Button onClick={() => resetValues()}>Tillbaka</Button>
                </Link>

                <Button onClick={() => restartGame()}>Nollställ</Button>
            </div>

            <br />
            <h4>
                INFO:
                <br />
                För att lägga till PENGAR på vågen börja med att klicka på "1:A VÄNSTER" och lägg till de valörer
                som önskas på den vänstra sidan, tryck sedan på "1:A HÖGER" för att göra samma sak på höger sida. När allt är på plats på vågen
                klicka på "STARTA" för att aktivera balanseringen av vågen.
                <br />
                För att lägga till SIFFROR på vågen börja med att klicka på "1:A VÄNSTER" och lägg till önskad siffra,
                klicka sedan på någon av operatorerna med "(V)" för att lägga till önskad operator på vänster sida.
                Gör sedan samma sak fast på höger sida och klicka på "STARTA" för att aktivera balanseringen av vågen.
            </h4>

            <br />

            <h4>
                OBS:
                <br />
                Det går inte att använda operatorerna för pengar och man kan inte kombinera pengar med siffror
            </h4>
        </>
    );
}
