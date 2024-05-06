import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import My_AppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { Cursor } from "react-simple-typewriter";
import { useRouter } from "next/router";
import Head from "next/head";
import { LanguageContext } from "../../context/LanguageContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Form() {
  const [elevation1, setElevation1] = React.useState(1);
  const [elevation2, setElevation2] = React.useState(1);
  const { lang, setLang } = React.useContext(LanguageContext);


  React.useEffect(() => {
    const langCheck = localStorage.getItem("lang");
    setLang(langCheck);
  }, []);

  const router = useRouter();

  const hoverHandler1 = () => {
    setElevation1(5);
  };

  const mouseLeaveHandler1 = () => {
    setElevation1(1);
  };

  const hoverHandler2 = () => {
    setElevation2(5);
  };

  const mouseLeaveHandler2 = () => {
    setElevation2(1);
  };

  const clickHandler = (device) => {
    if (device && device === "phone") {
      router.push("/form/phone");
    } else if (device && device === "laptop") {
      router.push("/form/laptop");
    }
  };

  return (
    <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: { xs: 14, sm: 20 },
              pb: { xs: 8, sm: 12 },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
                fontSize: "clamp(3.5rem, 10vw, 4rem)",
              }}
            >
            {lang === "EN" && "What are you looking for?"}
            {lang === "DE" && "Was suchen Sie?"}
            {lang === "VN" && "Bạn đang tìm kiếm gì?"}
            </Typography>
            <Stack
              direction={{ sm: "column", md: "row" }}
              spacing={5}
              sx={{ pt: 10, cursor: "pointer" }}
            >
              <Item
                onClick={() => clickHandler("laptop")}
                onMouseEnter={hoverHandler1}
                onMouseLeave={mouseLeaveHandler1}
                elevation={elevation1}
              >
                <Image
                  width={300}
                  height={300}
                  src={"/static/images/laptop.jpeg"}
                />
                <Typography>Laptop</Typography>
              </Item>
              <Item
                onClick={() => clickHandler("phone")}
                onMouseEnter={hoverHandler2}
                onMouseLeave={mouseLeaveHandler2}
                elevation={elevation2}
              >
                <Image
                  width={300}
                  height={300}
                  src={"/static/images/phone.jpeg"}
                />
                {lang === "EN" && <Typography>Phone</Typography>}
                {lang === "DE" && <Typography>Handy</Typography>}
                {lang === "VN" && <Typography>Điện thoại di động</Typography>}
              </Item>
            </Stack>
          </Box>
    </>
  );
}
