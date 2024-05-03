import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";

export default function MediaCard({ title, content, image, id }) {
  const router = useRouter();
  const [elevation, setElevation] = React.useState(1);

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/post/${id}`);
  };

  return (
    <Paper
      onMouseEnter={() => setElevation(4)}
      onMouseLeave={() => setElevation(1)}
      sx={{ maxWidth: 345, minWidth: 250, cursor: "pointer" }}
      elevation={elevation}
    >
      <Card
        onClick={handleClick}
        sx={{ maxWidth: 400, minWidth: 250, minHeight: 400, cursor: "pointer" }}
      >
        <CardMedia sx={{ height: 140 }} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            sx={{
              webkitBoxOrient: "vertical",
              webkitLineClamp: 1,
              overflow: "hidden",
              display: "-webkit-box",
            }}
            component={"div"}
            variant="body2"
            color="text.secondary"
          >
            {content ? (
              <div
                style={{
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                  display: "-webkit-box",
                }}
                dangerouslySetInnerHTML={{
                  __html: content.split("<p>")[1].split("</p>")[0],
                }}
              />
            ) : (
              "Loading.."
            )}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
