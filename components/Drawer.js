import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from "@mui/icons-material/Feed";
import { Link } from "@mui/material";
import * as React from "react";
let buttons = ["Home", "Form", "Laptop Form", "Phone form"];
export default function DrawerList(props) {
  const [lang, setLang] = React.useState("EN");

  const urls = ["/", "/form", "/form/laptop", "/form/phone"];
 

  React.useEffect(() => {
    const langCheck = localStorage.getItem("lang");
    setLang(langCheck);
    console.log(langCheck)
    if (langCheck === "EN") {
      buttons = ["Home", "Form", "Laptop Form", "Phone form"];
    }
    if (langCheck === "DE") {
      buttons = ["Home", "Formular", "Laptop-Formular", "Telefon-Formular"];
    }
    if (langCheck === "VN") {
      buttons = ["Home", "Biểu mẫu", "Biểu mẫu laptop", "Biểu mẫu điện thoại"];
    }
  }, []);

  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={props.close(false)}>
      <List>
        {buttons.map((text, index) => (
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
