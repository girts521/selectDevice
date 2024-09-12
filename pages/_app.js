import * as React from "react";
import { Analytics } from "@vercel/analytics/react";
import Footer from "../components/Footer";
import My_AppBar from "../components/AppBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { LanguageContext } from "../context/LanguageContext";

const darkTheme = createTheme({
  palette: {
// TODO...
  },
});

export default function MyApp({ Component, pageProps }) {
  const [lang, setLang] = React.useState("EN")

  return (
    <>
      <CssBaseline />
      <Head>
        <title>Find your next device!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LanguageContext.Provider value={{lang, setLang}}>
      <ThemeProvider theme={darkTheme}>
        <Container>
          <My_AppBar />
          <Component {...pageProps} />
          <Footer />
        </Container>
      </ThemeProvider>
      <Analytics />
      </LanguageContext.Provider>
    </>
  );
}
