import { Button } from "@material-ui/core";
import Link from "next/link";
import React from "react";



export default function Home() {
  return (
    <>
      <h1><center>Välj svårighetsgrad</center></h1>

      <h2>Större, mindre eller lika med</h2>
      <Link href="/klossar">
        <Button variant="contained" color="primary" size = "large" fullWidth = {true}>1.Klossar</Button>
      </Link>
      <Link href="/siffror">
        <Button variant="contained" color="primary" size = "large" fullWidth = {true}>1.Siffror</Button>
      </Link>
      <Link href="/pengar">
        <Button variant="contained" color="primary" size = "large" fullWidth = {true}>1.Pengar</Button>
      </Link>

      <h2>Balansera Vågen</h2>
      <Link href="/klossar_balansera">
        <Button variant="contained" color="primary" size = "large" fullWidth = {true}>2.Klossar</Button>
      </Link>
      <Link href="/siffror_balansera">
        <Button variant="contained" color="primary" size = "large" fullWidth = {true}>2.Siffror</Button>
      </Link>
      <Link href="/pengar_balansera">
        <Button variant="contained" color="primary" size = "large" fullWidth = {true}>2.Pengar</Button>
      </Link>

      <h2>Större, mindre eller lika med</h2>
      <Link href="/multiplikation">
        <Button variant="contained" color="secondary" size = "large" fullWidth = {true}>3.Multiplikation</Button>
      </Link>
      <Link href="/division">
        <Button variant="contained" color="secondary" size = "large" fullWidth = {true}>3.Divison</Button>
      </Link>

      <h2>Balansera Vågen</h2>
      <Link href="/multiplikation_balansera">
        <Button variant="contained" color="secondary" size = "large" fullWidth = {true}>4.Multiplikation</Button>
      </Link>
      <Link href="/division_balansera">
        <Button variant="contained" color="secondary" size = "large" fullWidth = {true}>4.Divison</Button>
      </Link>

      <h2>Custom</h2>
      <Link href="/custom ">
        <Button variant="contained" color="primary" size = "large" fullWidth = {true}>5.Gör Egna uppgifter</Button>
      </Link>
    </>
  );
}