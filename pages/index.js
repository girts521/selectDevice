
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import My_AppBar from "../components/AppBar";
import Hero from "../components/Hero";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import * as React from "react";
import { Analytics } from '@vercel/analytics/react';
import ProductCard from "../components/ProductCard";


export default function Home() {
  return (
    <>
        <Container>
          <Hero />
          <Blog />
          <ProductCard />
        </Container>
    </>
  );
}
