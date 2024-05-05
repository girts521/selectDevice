import * as react from "react";
import HorizontalLinearStepper from "../../components/Stepper";
import Head from "next/head";


export default function laptop() {
  return (
    <>
      <Head>
        <title>Find your next device!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HorizontalLinearStepper />
    </>
  );
}
