import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from "@mui/icons-material/Feed";
import { Link } from "@mui/material";
import * as React from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function DrawerList(props) {
  const { lang, setLang } = React.useContext(LanguageContext);

  const urls = ["/", "/form", "/form/laptop", "/form/phone"];
  const buttonsEN = ["Home", "Form", "Laptop Form", "Phone form"];
  const buttonsDE = ["Home", "Formular", "Laptop-Formular", "Telefon-Formular"];
  const buttonsVN = [
    "Home",
    "Biểu mẫu",
    "Biểu mẫu laptop",
    "Biểu mẫu điện thoại",
  ];

  React.useEffect(() => {
    const langCheck = localStorage.getItem("lang");
    setLang(langCheck);
  }, []);

  // TODO:
  // Maybe the languages can use a common component
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={props.close(false)}>
      <List>
        {lang === "EN" &&
          buttonsEN.map((text, index) => (
            <Link underline="none" color={"inherit"} href={urls[index]}>
              {" "}
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <FeedIcon />}
                    {index === 2 && <ComputerIcon />}
                    {index === 3 && <SmartphoneIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}

        {lang === "DE" &&
          buttonsDE.map((text, index) => (
            <Link underline="none" color={"inherit"} href={urls[index]}>
              {" "}
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <FeedIcon />}
                    {index === 2 && <ComputerIcon />}
                    {index === 3 && <SmartphoneIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}

        {lang === "VN" &&
          buttonsVN.map((text, index) => (
            <Link underline="none" color={"inherit"} href={urls[index]}>
              {" "}
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <FeedIcon />}
                    {index === 2 && <ComputerIcon />}
                    {index === 3 && <SmartphoneIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
      </List>
    </Box>
  );
}
