import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { LanguageContext } from "../../context/LanguageContext";


export default function InfoTable({title, current_price, discount, minPrice, maxPrice}) {
  const { lang, setLang } = React.useContext(LanguageContext);

  React.useEffect(() => {
    const langCheck = localStorage.getItem("lang");
    setLang(langCheck);
  },[])

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableBody>
          <TableRow key={"title"}>
            <TableCell component="th" scope="row">
              {lang === "EN" && "Title"}  
              {lang === "DE" && "Titel"}
              {lang === "VN" && "Tiêu đề"}            
              </TableCell>
            <TableCell align="right">{title}</TableCell>
          </TableRow>
        
          <TableRow key={"current_price"}>
            <TableCell component="th" scope="row">
              {lang === "EN" && "Current Price"}  
              {lang === "DE" && "Aktueller Preis"}
              {lang === "VN" && "Giá Hiện tại"}    
            </TableCell>
            <TableCell align="right">{current_price} €</TableCell>
          </TableRow>

          <TableRow key={"discount"}>
            <TableCell component="th" scope="row">
              {lang === "EN" && "Current Discount"}  
              {lang === "DE" && "Aktueller Rabatt"}
              {lang === "VN" && "Giảm Giá Hiện tại"}   
            </TableCell>
            <TableCell align="right">{Math.round(discount)}%</TableCell>
          </TableRow>

          <TableRow key={"max-price"}>
            <TableCell component="th" scope="row">
              {lang === "EN" && "Highest price so far"}  
              {lang === "DE" && "Höchster Preis bisher"}
              {lang === "VN" && "Giá cao nhất cho đến nay"}   
            </TableCell>
            <TableCell align="right">{maxPrice} €</TableCell>
          </TableRow>

          <TableRow key={"min-price"}>
            <TableCell component="th" scope="row">
              {lang === "EN" && "Lowest price so far"}  
              {lang === "DE" && "Niedrigster Preis bisher"}
              {lang === "VN" && "Giá thấp nhất cho đến nay"}   
            </TableCell>
            <TableCell align="right">{minPrice} €</TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}
