import Container from "@mui/material/Container";
import Hero from "../components/Hero";
import Blog from "../components/Blog";
import * as React from "react";
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
