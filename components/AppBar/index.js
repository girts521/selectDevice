import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DrawerList from "../Drawer";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useRouter } from 'next/router';
import { LanguageContext } from "../../context/LanguageContext";

let langCheck = "EN";

export default function My_AppBar() {
  const [open, setOpen] = React.useState(false);
  // const [lang, setLang] = React.useState(null)
  const enRef = React.useRef();
  const deRef = React.useRef();
  const vnRef = React.useRef();

  const router = useRouter();

  const { lang, setLang } = React.useContext(LanguageContext);
  

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleLang = (e) => {
    localStorage.setItem("lang", e.target.value)
    setLang(e.target.value)
  }

  React.useEffect(() => {
    const checkLang = localStorage.getItem("lang")
    if (!checkLang) {
      localStorage.setItem("lang", "EN")
      setLang("EN")
    }
    if (lang === "EN" || checkLang === "EN"){
      enRef.current.selected = true;
    }
    if (lang === "DE" || checkLang === "DE"){
      deRef.current.selected = true;
    }
    if (lang === "VN" || checkLang === "VN"){
      vnRef.current.selected = true;
    }
  }, [])


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="primary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link color={"inherit"} underline="none" href="/">
                My Tech Finder
              </Link>
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <NativeSelect
                  // defaultValue={lang}
                  onChange={toggleLang}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                >
                  <option ref={enRef} value={"EN"}>English</option>
                  <option ref={deRef} value={"DE"}>German</option>
                  <option ref={vnRef} value={"VN"}>Vietnamese</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {<DrawerList close={toggleDrawer} />}
      </Drawer>{" "}
    </>
  );
}
