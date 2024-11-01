import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MediaCard from "../Card";
import CircularProgress from "@mui/material/CircularProgress";
import { LanguageContext } from "../../context/LanguageContext";

export default function Blog() {
  const [blogPost, setBlogPost] = React.useState(null);
  const { lang, setLang } = React.useContext(LanguageContext);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("../../static/articles.json");
      const data = await response.json();
      setBlogPost(data.blogPosts);
    }
    fetchData();
    const langCheck = localStorage.getItem("lang");
    setLang(langCheck);
  }, []);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
            color: "#333333"
          }}
        >
          {lang === "EN" && "Not really\u00a0sure what you need?"}
          {lang === "DE" && "Nicht wirklich sicher,\u00a0 was Sie benötigen?"}
          {lang === "VN" && "Không hoàn toàn chắc chắn bạn cần gì?"}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontSize: "clamp(1.5rem, 10vw, 2rem)",
            color: "#333333"
          }}
        >
          {lang === "EN" && "Read one of my articles and find out!"}
          {lang === "DE" && "Lies einen meiner Artikel und finde es heraus!"}
          {lang === "VN" &&
            "Đọc một trong những bài viết của tôi và tìm hiểu thêm!"}
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
            {blogPost ? (
              blogPost.map((blog, index) => {
                return (
                  <Grid key={index} item xs>
                    {lang === "EN" && (
                      <MediaCard
                        title={blog.titleEN}
                        content={blog.contentEN}
                        image={blog.image}
                        id={blog.id}
                      />
                    )}
                    {lang === "DE" && (
                      <MediaCard
                        title={blog.titleDE}
                        content={blog.contentDE}
                        image={blog.image}
                        id={blog.id}
                      />
                    )}
                    {lang === "VN" && (
                      <MediaCard
                        title={blog.titleVN}
                        content={blog.contentVN}
                        image={blog.image}
                        id={blog.id}
                      />
                    )}
                  </Grid>
                );
              })
            ) : (
              <Box sx={{ display: "flex", m: 7 }}>
                <CircularProgress />
              </Box>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
