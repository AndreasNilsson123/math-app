import { Button, ButtonGroup, LinearProgress} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import times from "lodash/times";
import Link from "next/link";
import { useState } from "react";
import Seesaw from "../components/Seesaw";



const nrOfTasks = 10;
const numItemsLeft = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
const numItemsRight = [...Array(nrOfTasks)].map(() => Math.floor(Math.random() * (9)) + 1);
let taskNumber = 0;
let check = false;

export default function Easy() {
  const [flip, setFlip] = useState(false);
  const [correct, setCorrect] = useState(null);

  const checkAnswer = (answer) => {
    if (check === false) {
      check = true;
      const less = numItemsLeft[taskNumber] < numItemsRight[taskNumber];
      const equal = numItemsLeft[taskNumber] === numItemsRight[taskNumber];
      const greater = numItemsLeft[taskNumber] > numItemsRight[taskNumber];

      const correct =
        less && answer === "less" ||
        equal && answer === "equal" ||
        greater && answer === "greater";

      setCorrect(correct);
      setFlip(less ? "right" : greater ? "left" : false);
    }else{
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

  const resetValues = () =>{
    taskNumber = 0;
    check = false;
  }

  const restartGame = () => {
    location.reload();
  }

  return (
    <>
    <center>
      <h1>Klossar</h1>

      <ButtonGroup variant="contained" color="primary">
        <Button onClick={() => checkAnswer("greater")}>&gt;</Button>
        <Button onClick={() => checkAnswer("equal")}>=</Button>
        <Button onClick={() => checkAnswer("less")}>&lt;</Button>
      </ButtonGroup>

      <br />

      <Seesaw flip={flip}>
        <Seesaw.Left>
          {times(numItemsLeft[taskNumber])
            .map((i) => <div key={i}>⬛</div>)}
        </Seesaw.Left>
        <Seesaw.Right>
          {times(numItemsRight[taskNumber])
            .map((i) => <div key={i}>🟫</div>)}
        </Seesaw.Right>
      </Seesaw>

      <br />

      <LinearProgress variant="determinate" value={(taskNumber+1)/nrOfTasks * 100} />

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