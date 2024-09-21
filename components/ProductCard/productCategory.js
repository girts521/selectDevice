import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

export default function ProductCategory({elevation, title, productArr, handleClick}) {
  const router = useRouter();

  return (
    <>
      <Typography
        variant="h1"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          alignSelf: "center",
          textAlign: "center",
          fontSize: "clamp(2.5rem, 10vw, 3rem)",
          mb: "25px",
        }}
      >
       {title}
      </Typography>
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
                  <Card
                    onClick={(e) => {
                      handleClick(e, data.product_link);
                    }}
                    sx={{
                      maxWidth: 400,
                      minWidth: 250,
                      minHeight: 400,
                      cursor: "pointer",
                    }}
                  >
                    <CardMedia
                      sx={{ height: 140, backgroundSize: "contain" }}
                      image={data.image}
                      title={data.title}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="span"
                        component="div"
                        sx={{}}
                      >
                        {data.title}
                      </Typography>
                      <Typography
                        sx={{
                          webkitBoxOrient: "vertical",
                          webkitLineClamp: 1,
                          overflow: "hidden",
                          display: "-webkit-box",
                        }}
                        component={"div"}
                        variant="h5"
                        color="text.primary"
                      >
                        -{parseInt(data.discount)}%, {data.current_price}
                      </Typography>
                    </CardContent>
                  </Card>
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
