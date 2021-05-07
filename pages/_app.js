import { Container } from "@material-ui/core";
import Head from "next/head";
import "../styles/globals.css";
import "../styles/klossar.css";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Vågen</title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        
      </Head>

      <main>
        <Container maxWidth="sm">

          <Component {...pageProps} />
        </Container>

      </main>

    </>
  );
}

export default MyApp;