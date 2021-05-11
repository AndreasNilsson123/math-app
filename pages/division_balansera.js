import { Button, ButtonGroup, LinearProgress, TableSortLabel } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Link from "next/link";
import { useState } from "react";
import Seesaw from "./components/Seesaw";

//constants
const nrOfTasks = 5;
let taskNumber = 0;
let check = false;

let firstLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
let secondLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
let rightSide = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (5)) + 1);

/* ---    Manipulate values so addition can work    --- */
const fixSides = () => {
  if (firstLeft[taskNumber].length === 0) {
    let i;
    let j = 0;
    let iter = 0;
    let alt = [];
    for (i = 0; i < 10; i++) {
      if (iter < 150) {
        if (rightSide[taskNumber] * secondLeft[taskNumber] === i + 1) {
          break;
        } else if (i === 9 && secondLeft[taskNumber] < 10) {
          secondLeft[taskNumber]++;
          i = 0;
        } else if (i === 9 && secondLeft[taskNumber] === 10) {
          secondLeft[taskNumber] = 1;
          i = 0;
        }
      } else {
        console.log(iter)
        console.log("ERROR-infinte loop #0001")
      }
      iter++;
    }
  }
}

/* ---    Randomize side to be emmpty      --- */
const randomSide = () => {
  let randomNumber = Math.floor(Math.random() * (2));
  randomNumber = 0;
  if (randomNumber === 0) {
    firstLeft[taskNumber] = [];
  } else {
    secondLeft[taskNumber] = [];
  }
}


randomSide();
fixSides();


export default function Easy() {
  const [flip, setFlip] = useState(false);
  const [correct, setCorrect] = useState(null);

  /* ---    Check Number given by the buttons with checkAnswer    --- */
  const checkNumber = (number) => {
    if (firstLeft[taskNumber].length === 0) {
      firstLeft[taskNumber] = number;
    } else {
      secondLeft[taskNumber] = number;
    }
    let totLeft = firstLeft[taskNumber] / secondLeft[taskNumber];
    let totRight = rightSide[taskNumber];
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
    randomSide();
  }

  /* ---    Restart game when pressing "Nollställ"     --- */
  const restartGame = () => {
    location.reload();
  }



  return (
    <>
      <center>
        <h1><center>Siffror</center></h1>
        <h4><center>Balansera vågen!</center></h4>
        <center>
          <ButtonGroup variant="contained" color="primary" size="large">
            <Button onClick={() => checkNumber(1)}>1</Button>
            <Button onClick={() => checkNumber(2)}>2</Button>
            <Button onClick={() => checkNumber(3)}>3</Button>
            <Button onClick={() => checkNumber(4)}>4</Button>
            <Button onClick={() => checkNumber(5)}>5</Button>
            <Button onClick={() => checkNumber(6)}>6</Button>
            <Button onClick={() => checkNumber(7)}>7</Button>
            <Button onClick={() => checkNumber(8)}>8</Button>
            <Button onClick={() => checkNumber(9)}>9</Button>
            <Button onClick={() => checkNumber(10)}>10</Button>
          </ButtonGroup>
        </center>

        <br />

        <Seesaw flip={flip}>
          <Seesaw.Left>
            <div>{firstLeft[taskNumber]}/{secondLeft[taskNumber]}</div>
          </Seesaw.Left>
          <Seesaw.Right>
            <div>{rightSide[taskNumber]}</div>
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