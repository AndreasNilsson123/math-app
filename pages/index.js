import { Button } from "@material-ui/core";
import Link from "next/link";
import React from "react";



export default function Home() {
  return (
    <>
      <h1><center>Välj svårighetsgrad</center></h1>

      <Link href="/easy">
        <Button variant="contained" color="primary" size = "large" fullWidth = {true}>Lätt (+ och -)</Button>
      </Link>

      <br/>

      <Link href="/hard">
        <Button variant="contained" color="secondary" size = "large" fullWidth = {true}>Svår (* och /)</Button>
      </Link>

    </>
  );
}