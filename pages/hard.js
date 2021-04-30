import { Button, ButtonGroup} from "@material-ui/core";
import Link from "next/link";

export default function HardLevels(){
    return(
        <>
            <h1>Vilken nivå</h1>

            <Link href="/hard/multiplikation">
                <Button variant="contained" color = "secondary">Multiplikation</Button>
            </Link>

            <Link href="/hard/division">
                <Button variant="contained" color = "secondary">Division</Button>
            </Link>

            <Link href="/hard/blandade">
                <Button variant="contained" color = "secondary">Blandade</Button>
            </Link>

        <div>
            <Link href="/">
                <Button>Tillbaka</Button>
            </Link>
        </div>
        </>


    )
}
