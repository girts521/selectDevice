import Box from "@mui/material/Box";
import List from "@mui/material/List";
import * as React from "react";
import { LanguageContext } from "../context/LanguageContext";
import DrawerLink from "./DrawerLink"

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

  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={props.close(false)}>
      <List>
        {lang === "EN" &&
          buttonsEN.map((text, index) => (
            <DrawerLink text={text} index={index} urls={urls} />
          ))}

        {lang === "DE" &&
          buttonsDE.map((text, index) => (
            <DrawerLink text={text} index={index} urls={urls} />
          ))}

        {lang === "VN" &&
          buttonsVN.map((text, index) => (
            <DrawerLink text={text} index={index} urls={urls} />
          ))}
      </List>
    </Box>
  );
}
