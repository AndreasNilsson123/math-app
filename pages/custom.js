import { Button, ButtonGroup } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import times from "lodash/times";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Seesaw from "./components/Seesaw";

const randInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
let side = "left";

const createObject = ({ moneyFive = 0, moneyTen = 0, moneyTwenty = 0, one = 0, two = 0, three = 0, four = 0, five = 0, six = 0, seven = 0, eight = 0, nine = 0, ten = 0 } = {}) => ({
  moneyFive, moneyTen, moneyTwenty,                             //Money objects
  one, two, three, four, five, six, seven, eight, eight, nine, ten,  //Number objects
  get sum() {
    return this.moneyFive * 5 + this.moneyTen * 10 + this.moneyTwenty * 20 + this.one * 1 + this.two * 2 + this.three * 3 + this.four * 4 + this.five * 5 + this.six * 6 + this.seven * 7 + this.eight * 8 + this.nine * 9 + this.ten * 10
  },
  plusMoneyFive() {
    return createObject({ ...this, moneyFive: this.moneyFive + 1, });
  },
  plusMoneyTen() {
    return createObject({ ...this, moneyTen: this.moneyTen + 1, });
  },
  plusMoneyTwenty() {
    return createObject({ ...this, moneyTwenty: this.moneyTwenty + 1 });
  },
  plusOne() {
    return createObject({ ...this, one: this.one + 1 });
  },
  plusTwo() {
    return createObject({ ...this, two: this.two + 1 });
  },
  plusThree() {
    return createObject({ ...this, three: this.three + 1 });
  },
  plusFour() {
    return createObject({ ...this, four: this.four + 1 });
  },
  plusFive() {
    return createObject({ ...this, five: this.five + 1 });
  },
  plusSix() {
    return createObject({ ...this, six: this.six + 1 });
  },
  plusSeven() {
    return createObject({ ...this, seven: this.seven + 1 });
  },
  plusEight() {
    return createObject({ ...this, eight: this.eight + 1 });
  },
  plusNine() {
    return createObject({ ...this, nine: this.nine + 1 });
  },
  plusTen() {
    return createObject({ ...this, ten: this.ten + 1 });
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
  const [correct, setCorrect] = useState(null);
  const [check, setCheck] = useState(false);

  const [leftObject, setLeftObject] = useState(randObject(0));
  const [rightObject, setRightObject] = useState(randObject(0));


  const checkAnswer = (answer) => {
    const totLeft = leftObject.sum;
    const totRight = rightObject.sum;

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

  const addObject = (value, side) => {
    console.log(value, side);
    if (value === "moneyTwenty" && side === "left") {
      console.log("TEST")
      setLeftObject(leftObject.plusMoneyTwenty());
    }
    if (value === "moneyTen" && side === "left") {
      setLeftObject(leftObject.plusMoneyTen());
    }
    if (value === "moneyFive" && side === "left") {
      setLeftObject(leftObject.plusMoneyFive());
    }
    if (value === "one" && side === "left") {
      setLeftObject(leftObject.plusOne());
    }
    if (value === "two" && side === "left") {
      setLeftObject(leftObject.plusTwo());
    }
    if (value === "three" && side === "left") {
      setLeftObject(leftObject.plusThree());
    }
    if (value === "four" && side === "left") {
      setLeftObject(leftObject.plusFour());
    }
    if (value === "five" && side === "left") {
      setLeftObject(leftObject.plusFive());
    }
    if (value === "six" && side === "left") {
      setLeftObject(leftObject.plusSix());
    }
    if (value === "seven" && side === "left") {
      setLeftObject(leftObject.plusSeven());
    }
    if (value === "eight" && side === "left") {
      setLeftObject(leftObject.plusEight());
    }
    if (value === "nine" && side === "left") {
      setLeftObject(leftObject.plusNine());
    }
    if (value === "ten" && side === "left") {
      setLeftObject(leftObject.plusTen());
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
    if (value === "one" && side === "right") {
      setRightObject(rightObject.plusOne());
    }
    if (value === "two" && side === "right") {
      setRightObject(rightObject.plusTwo());
    }
    if (value === "three" && side === "right") {
      setRightObject(rightObject.plusThree());
    }
    if (value === "four" && side === "right") {
      setRightObject(rightObject.plusFour());
    }
    if (value === "five" && side === "right") {
      setRightObject(rightObject.plusFive());
    }
    if (value === "six" && side === "right") {
      setRightObject(rightObject.plusSix());
    }
    if (value === "seven" && side === "right") {
      setRightObject(rightObject.plusSeven());
    }
    if (value === "eight" && side === "right") {
      setRightObject(rightObject.plusEight());
    }
    if (value === "nine" && side === "right") {
      setRightObject(rightObject.plusNine());
    }
    if (value === "ten" && side === "right") {
      setRightObject(rightObject.plusTen());
    }
  }

  const resetValues = () => {
    setLeftObject(randObject(0));
    setRightObject(randObject(0));
    setCheck(false);
    setFlip(false);
    setCorrect(null);
  }

  const restartGame = () => {
    setCheck(false);
    setLeftObject(randObject(0));
    setRightObject(randObject(0));
    setFlip(false);
    setCorrect(null);
  }


  return (
    <>
      <center>
        <h1>Custom</h1>

        <ButtonGroup variant="contained" color="primary" id="firstpagebtn">
          <Button onClick={() => addObject("moneyTwenty", side)}><Image src="/tjugolapp.jpg" layout="fixed" width={75} height={45} alt="Tjugolapp" quality={50} /></Button>
          <Button onClick={() => addObject("moneyTen", side)}><Image src="/tiokrona.png" layout="fixed" width={35} height={35} alt="Tiokrona" quality={50} /></Button>
          <Button onClick={() => addObject("moneyFive", side)}><Image src="/femkrona.png" layout="fixed" width={40} height={40} alt="Femkrona" quality={50} /></Button>
          <Button onClick={() => checkAnswer("equal")}>Start</Button>
        </ButtonGroup>

        <br />

        <ButtonGroup variant="contained" color="primary" id="firstpagebtn">
          <Button onClick={() => addObject("one", side)}>1</Button>
          <Button onClick={() => addObject("two", side)}>2</Button>
          <Button onClick={() => addObject("three", side)}>3</Button>
          <Button onClick={() => addObject("four", side)}>4</Button>
          <Button onClick={() => addObject("five", side)}>5</Button>
          <Button onClick={() => addObject("six", side)}>6</Button>
          <Button onClick={() => addObject("seven", side)}>7</Button>
          <Button onClick={() => addObject("eight", side)}>8</Button>
          <Button onClick={() => addObject("nine", side)}>9</Button>
          <Button onClick={() => addObject("ten", side)}>10</Button>
        </ButtonGroup>

        <br />
        <ButtonGroup id="firstpagebtn">
          <Button onClick={() => side = "left"}>1:a vänster</Button>
          <Button onClick={() => side = "right"}>1:a höger</Button>
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
            {times(leftObject.one)
              .map((i) => <div key={i}>1</div>)}
            {times(leftObject.two)
              .map((i) => <div key={i}>2</div>)}
            {times(leftObject.three)
              .map((i) => <div key={i}>3</div>)}
            {times(leftObject.four)
              .map((i) => <div key={i}>4</div>)}
            {times(leftObject.five)
              .map((i) => <div key={i}>5</div>)}
            {times(leftObject.six)
              .map((i) => <div key={i}>6</div>)}
            {times(leftObject.seven)
              .map((i) => <div key={i}>7</div>)}
            {times(leftObject.eight)
              .map((i) => <div key={i}>8</div>)}
            {times(leftObject.nine)
              .map((i) => <div key={i}>9</div>)}
            {times(leftObject.ten)
              .map((i) => <div key={i}>10</div>)}

          </Seesaw.Left>
          <Seesaw.Right>
            {times(rightObject.moneyTwenty)
              .map((i_4) => <div key={i_4}><Image src="/tjugolapp.jpg" layout="fixed" width={75} height={45} alt="Tjugolapp" quality={50} /></div>)}
            {times(rightObject.moneyTen)
              .map((i_5) => <div key={i_5}><Image src="/tiokrona.png" layout="fixed" width={35} height={35} alt="Tiokrona" quality={50} /></div>)}
            {times(rightObject.moneyFive)
              .map((i_6) => <div key={i_6}><Image src="/femkrona.png" layout="fixed" width={40} height={40} alt="Femkrona" quality={50} /></div>)}
            {times(rightObject.one)
              .map((i) => <div key={i}>1</div>)}
            {times(rightObject.two)
              .map((i) => <div key={i}>2</div>)}
            {times(rightObject.three)
              .map((i) => <div key={i}>3</div>)}
            {times(rightObject.four)
              .map((i) => <div key={i}>4</div>)}
            {times(rightObject.five)
              .map((i) => <div key={i}>5</div>)}
            {times(rightObject.six)
              .map((i) => <div key={i}>6</div>)}
            {times(rightObject.seven)
              .map((i) => <div key={i}>7</div>)}
            {times(rightObject.eight)
              .map((i) => <div key={i}>8</div>)}
            {times(rightObject.nine)
              .map((i) => <div key={i}>9</div>)}
            {times(rightObject.ten)
              .map((i) => <div key={i}>10</div>)}
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
    </>
  );



}
