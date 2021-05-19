import { Button, ButtonGroup, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import times from "lodash/times";
import Link from "next/link";
import { useState } from "react";
import Seesaw from "./components/Seesaw";
import Image from "next/image";

//[...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1)
const nrOfTasks = 10;


const numFiveLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (3)) + 0);
const numFiveRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (3)) + 0);

const numTenLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (3)) + 0);
const numTenRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (3)) + 0);

const numTwentyLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (2)) + 0);
const numTwentyRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (2)) + 0);

let taskNumber = 0;
let check = false;

export default function Easy() {
  const [flip, setFlip] = useState(false);
  const [correct, setCorrect] = useState(null);

  let totLeft = numTenLeft[taskNumber] * 10 + numTwentyLeft[taskNumber] * 20 + numFiveLeft[taskNumber] * 5;
  let totRight = numTenRight[taskNumber] * 10 + numTwentyRight[taskNumber] * 20 + numFiveRight[taskNumber] * 5;

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
      alert("Du har redan valt ett alternativ")
    }
  };

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
        <h1>Pengar</h1>

        <ButtonGroup variant="contained" color="primary">
          <Button onClick={() => checkAnswer("greater")}>&gt;</Button>
          <Button onClick={() => checkAnswer("equal")}>=</Button>
          <Button onClick={() => checkAnswer("less")}>&lt;</Button>
        </ButtonGroup>

        <br />

        <Seesaw flip={flip}>
          <Seesaw.Left>
            {times(numTwentyLeft[taskNumber])
              .map((i_1) => <div key={i_1}><Image src="/tjugolapp.jpg" layout="fixed" width={75} height={45} alt="Tjugolapp" quality={50} /></div>)}
            {times(numTenLeft[taskNumber])
              .map((i_2) => <div key={i_2}><Image src="/tiokrona.jpg" layout="fixed" width={35} height={35} alt="Tiokrona" quality={50} /></div>)}
            {times(numFiveLeft[taskNumber])
              .map((i_3) => <div key={i_3}><Image src="/femkrona.png" layout="fixed" width={40} height={40} alt="Femkrona" quality={50} /></div>)}
          </Seesaw.Left>
          <Seesaw.Right>
            {times(numTwentyRight[taskNumber])
              .map((i_4) => <div key={i_4}><Image src="/tjugolapp.jpg" layout="fixed" width={75} height={45} alt="Tjugolapp" quality={50} /></div>)}
            {times(numTenRight[taskNumber])
              .map((i_5) => <div key={i_5}><Image src="/tiokrona.jpg" layout="fixed" width={35} height={35} alt="Tiokrona" quality={50} /></div>)}
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