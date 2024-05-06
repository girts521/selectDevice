import * as React from "react";
import { Analytics } from '@vercel/analytics/react';
import Footer from "../components/Footer";
import My_AppBar from "../components/AppBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
    palette: {
      // primary: {
      //   main: "#e76f51",
      // },
      // secondary: {
      //   main: "#780000",
      // },
    },
  });

  export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <Head>
        <title>Find your next device!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <Container>
          <My_AppBar />
          <Component {...pageProps} />
          <Footer />
        </Container>
      </ThemeProvider>
      <Analytics />
    </>
  );
}

