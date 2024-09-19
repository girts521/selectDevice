import * as React from "react";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import ProductCategory from "./productCategory"

export default function ProductCard() {
  const router = useRouter();
  const [elevation, setElevation] = React.useState(1);
  const [kitchen_bestsellers, setkitchen_bestsellers] = React.useState(null);
  const [rice_cooker, setrice_cooker] = React.useState(null);
  const [kosmetik, setkosmetik] = React.useState(null);
  const [ninja, setninja] = React.useState(null);

  const tag = "&linkCode=ll1&tag=mytechfinde0b-21";
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/supabase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setkitchen_bestsellers(data.kitchen_bestsellers);
      setrice_cooker(data.rice_cooker);
      setkosmetik(data.kosmetik);
      setninja(data.ninja);
    };
    fetchData();
  }, []);

  const handleClick = (e, link) => {
    e.preventDefault();
    router.push(`${link}${tag}`);
  };

  return (
    <>
      <Typography
        variant="h1"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          alignSelf: "center",
          textAlign: "center",
          fontSize: "clamp(3.5rem, 10vw, 4rem)",
          mb: "35px",
        }}
      >
        Top deals Today!
      </Typography>
     <ProductCategory elevation={elevation} title={"Kitchen Bestsellers"} productArr={kitchen_bestsellers} handleClick={handleClick} />
     <ProductCategory elevation={elevation} title={"Ninja"} productArr={ninja} handleClick={handleClick} />
     <ProductCategory elevation={elevation} title={"Reiskocher"} productArr={rice_cooker} handleClick={handleClick} />
     <ProductCategory elevation={elevation} title={"Kosmetik"} productArr={kosmetik} handleClick={handleClick} />
    </>
  );
}
