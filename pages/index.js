import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import My_AppBar from "../components/AppBar";
import Hero from "../components/Hero";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import * as React from "react";
import { Analytics } from '@vercel/analytics/react';

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

export default function Home() {
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
          <Hero />
          <Blog />
          <Footer />
        </Container>
      </ThemeProvider>
      <Analytics />
    </>
  );
}
