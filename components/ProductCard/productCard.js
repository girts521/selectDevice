import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from 'next/router';
import Paper from "@mui/material/Paper";
import * as React from "react";



export default function ProductCard({data, handleClick}) {
    const router = useRouter();
    const [elevation, setElevation] = React.useState(1);
  return (
      <Paper
          onMouseEnter={() => setElevation(4)}
          onMouseLeave={() => setElevation(1)}
          sx={{ maxWidth: 345, minWidth: 250, cursor: "pointer" }}
          elevation={elevation}
      >
    <Card
      sx={{
        maxWidth: 400,
        minWidth: 250,
        minHeight: 400,
        cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
      }}
    >
      <CardMedia
          onClick={(e) => {
              handleClick(e, data.product_link);
          }}
        sx={{ height: 140, backgroundSize: "contain" }}
        image={data.image}
        title={data.title}
      />
      <CardContent>
        <Typography       onClick={(e) => {
            handleClick(e, data.product_link);
        }} gutterBottom variant="span" component="div" sx={{}}>
          {data.title}
        </Typography>
        <Typography
          sx={{
            webkitBoxOrient: "vertical",
            webkitLineClamp: 1,
            overflow: "hidden",
            display: "-webkit-box",
              marginTop: "7px",
              marginBottom: "7px",
          }}
          component={"div"}
          variant="h5"
          color="text.primary"
        >
          -{parseInt(data.discount)}%, {data.current_price}
        </Typography>
          <Button onClick={() => {
              router.push(`/data/${data.id}`)
          }} variant="contained">Price data</Button>
      </CardContent>
    </Card>
      </Paper>
  );
}
