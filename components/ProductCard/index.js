import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

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
        // body: JSON.stringify({ filteredResult, params, lang }),
      });

      const data = await response.json();
      console.log("data:", data);
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
        Kitchen Bestsellers
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          //   pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        {kitchen_bestsellers
          ? kitchen_bestsellers.map((data) => {
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
                </Paper>
              );
            })
          : "Loading"}
      </Container>

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
        Ninja
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          //   pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        {ninja
          ? ninja.map((data) => {
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
                </Paper>
              );
            })
          : "Loading"}
      </Container>

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
        Reiskocher
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          //   pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        {rice_cooker
          ? rice_cooker.map((data) => {
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
                </Paper>
              );
            })
          : "Loading"}
      </Container>

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
        Kosmetik
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          //   pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        {kosmetik
          ? kosmetik.map((data) => {
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
                </Paper>
              );
            })
          : "Loading"}
      </Container>
    </>
  );
}
