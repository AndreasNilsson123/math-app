import { Button, ButtonGroup } from "@material-ui/core";
import Link from "next/link";


export default function EasyLevels() {
    return (
        <>
            <h1>Vilken nivå</h1>

            <Link href="easy/klossar">
                <Button variant="contained" color="primary">Klossar</Button>
            </Link>

            <Link href="easy/pengar">
                <Button variant="contained" color="primary">Pengar</Button>
            </Link>

            <Link href="easy/siffror">
                <Button variant="contained" color="primary">Siffror</Button>
            </Link>

            <div>
                <Link href="/">
                    <Button>Tillbaka</Button>
                </Link>
            </div>
        </>


    )
}
