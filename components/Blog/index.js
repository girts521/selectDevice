import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MediaCard from "../Card";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Blog() {
  const [blogPost, setBlogPost] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("../../static/articles.json");
      const data = await response.json();
      setBlogPost(data.blogPosts);
    }

    fetchData();
  }, []);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          //   pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontSize: "clamp(1.5rem, 10vw, 2rem)",
          }}
        >
          Not really&nbsp;sure what you need?
        </Typography>
        <Typography
          variant="h2"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontSize: "clamp(1.5rem, 10vw, 2rem)",
          }}
        >
          Read one of my articles and find out!
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            marginTop: 10,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            direction={{ xs: "column", sm: "row", md: "row" }}
            alignContent={"center"}
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 2, md: 3 }}
          >
            {blogPost
              ? blogPost.map((blog, index) => {
                  console.log(blog.title);
                  return (
                    <Grid key={index} item xs>
                      <MediaCard title={blog.title} content={blog.content} image={blog.image} id={blog.id} />
                    </Grid>
                  );
                })
              : "Loading..."}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
