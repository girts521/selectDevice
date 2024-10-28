import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import ProductCard from './productCard'

export default function ProductCategory({elevation, title, productArr, handleClick}) {
  const router = useRouter();

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          pb: { xs: 8, sm: 12 },
        }}
      >
        {productArr
          ? productArr.map((data) => {
              return (
                <Paper
                  sx={{
                    maxWidth: 345,
                    minWidth: 250,
                    cursor: "pointer",
                    ml: "5px",
                    mb: "24px",
                  }}
                  elevation={elevation}
                >
                  <ProductCard data={data} handleClick={handleClick}/>
                  <Button onClick={() => {
                        router.push(`/data/${data.id}`)
                      }} variant="contained">Price data</Button>
                </Paper>
              );
            })
          : "Loading"}
      </Container>
    </>
  );
}
