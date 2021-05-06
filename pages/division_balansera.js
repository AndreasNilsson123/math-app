import { Button, ButtonGroup } from "@material-ui/core";
import Link from "next/link";
import { useState } from "react";
import Seesaw from "./components/Seesaw";

export default function Hard() {
  const [flip, setFlip] = useState(false);

  return (
    <>
      <h1>Blandade uppgifter</h1>

      <Seesaw flip={flip}/>

      <ButtonGroup variant="contained" color="primary">
        <Button onClick={() => setFlip("left")}>Vänster</Button>
        <Button onClick={() => setFlip(false)}>Mitten</Button>
        <Button onClick={() => setFlip("right")}>Höger</Button>
      </ButtonGroup>

      <div>
        <Link href="/hard">
          <Button>Tillbaka</Button>
        </Link>
      </div>
    </>
  )
}
