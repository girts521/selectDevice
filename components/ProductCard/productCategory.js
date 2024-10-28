import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import ProductCard from './productCard'

export default function ProductCategory({elevation, title, productArr, handleClick}) {


  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
            justifyContent: "space-between",
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
                </Paper>
              );
            })
          : "Loading"}
      </Container>
    </>
  );
}
