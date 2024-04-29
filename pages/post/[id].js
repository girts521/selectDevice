import * as React from "react";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import My_AppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HomeIcon from "@mui/icons-material/Home";
import ShareIcon from "@mui/icons-material/Share";
import ShareList from "../../components/ShareList";
import Popper from "@mui/material/Popper";





const darkTheme = createTheme({
  palette: {
    // primary: {
    //   main: "#e76f51",
    // },
    // secondary: {
    //   main: "#780000",
    // },
  },
});

export default function Post() {
  const router = useRouter();
  let postId = router.query.id;
  let id;

  const [blogPost, setBlogPost] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [url, setUrl] = React.useState("/");

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("../../static/articles.json");
      const data = await response.json();
      postId = router.query.id;
      const found = data.blogPosts.find((post) => post.id === postId);
      setBlogPost(found);
      console.log(router);
    }
    fetchData();
  }, [router.query]);

  React.useEffect(() => {
    setUrl(window && window ? window.location.href : "/");
    console.log(url);
    if (value == "0") {
      router.push("/");
    }
    if (value == "1") {
      setTimeout(() => {
        setValue(null);
      }, 300);
    }
    if (value == "2") {
      setTimeout(() => {
        setValue(null);
      }, 300);
      const id = parseInt(postId) + 1;
      if (isNaN(id)) {
        console.log("Invalid post ID");
      } else {
        router.push(`/post/${id}`);
      }
    }
  }, [value]);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const popId = open ? "simple-popper" : undefined;

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <Container>
          <My_AppBar />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: { xs: 14, sm: 20 },
              pb: { xs: 8, sm: 12 },
            }}
          >
            {blogPost ? (
              <>
                <Typography variant="h2" component="h2">
                  {blogPost.title}
                </Typography>
                <Typography
                  component={"div"}
                  variant="body2"
                  color="text.secondary"
                >
                  {blogPost.content ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blogPost.content,
                      }}
                    />
                  ) : (
                    "Loading.."
                  )}
                </Typography>
              </>
            ) : (
              "Loading..."
            )}
          </Box>
        </Container>
        <Popper id={popId} open={open} anchorEl={anchorEl}>
        <Paper elevation={1}>
          <Box sx={{ p: 1, bgcolor: "#fff" }}>
            <ShareList url={url} />
          </Box>
          </Paper>
        </Popper>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <Box>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Home" icon={<HomeIcon />} />
              <BottomNavigationAction
                onClick={handleClick}
                label="Share"
                icon={<ShareIcon />}
              />
              <BottomNavigationAction
                label="Next"
                icon={<ArrowForwardIosIcon />}
              />
            </BottomNavigation>
          </Box>
        </Paper>
        <Footer />
      </ThemeProvider>
    </>
  );
}
