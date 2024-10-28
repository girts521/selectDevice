import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";



export default function ProductCard({data, handleClick}) {
  return (
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
        <Typography gutterBottom variant="span" component="div" sx={{}}>
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
  );
}
