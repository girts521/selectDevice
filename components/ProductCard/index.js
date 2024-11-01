import * as React from "react";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import ProductCategory from "./productCategory"

export default function ProductCard() {
  const router = useRouter();
  const [elevation, setElevation] = React.useState(1);
  const [products, setProducts] = React.useState([]);

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
      setProducts(data.data);
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
        id="target"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          alignSelf: "center",
          textAlign: "center",
          fontSize: "clamp(3.5rem, 10vw, 4rem)",
          mb: "35px",
          color: "#1A1A33"
        }}
      >
        Top deals!
      </Typography>
     <ProductCategory elevation={elevation} title={""} productArr={products} handleClick={handleClick} />
    </>
  );
}
