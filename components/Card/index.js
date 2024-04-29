import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from 'next/router'

export default function MediaCard({ title, content, image, id }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault()
    router.push(`/post/${id}`)
  }

  return (
    <Card onClick={handleClick} sx={{ maxWidth: 345, minWidth: 250, cursor:'pointer' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography component={'div'} variant="body2" color="text.secondary">
          {content
            ?   <div
            dangerouslySetInnerHTML={{
              __html: content.split('<p>')[1].split('</p>')[0],
            }}
          />
            : "Loading.."}
        </Typography>
      </CardContent>
    </Card>
  );
}
