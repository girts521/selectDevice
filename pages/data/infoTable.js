import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as React from "react";

export default function InfoTable({title, current_price, discount, minPrice, maxPrice}) {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        {/* <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead> */}
        <TableBody>

          <TableRow key={"title"}>
            <TableCell component="th" scope="row">
                Title
            </TableCell>
            <TableCell align="right">{title}</TableCell>
          </TableRow>
        
          <TableRow key={"current_price"}>
            <TableCell component="th" scope="row">
                Current Price
            </TableCell>
            <TableCell align="right">{current_price} €</TableCell>
          </TableRow>

          <TableRow key={"discount"}>
            <TableCell component="th" scope="row">
                Current Discount
            </TableCell>
            <TableCell align="right">{Math.round(discount)}%</TableCell>
          </TableRow>

          <TableRow key={"max-price"}>
            <TableCell component="th" scope="row">
                Highest price so far
            </TableCell>
            <TableCell align="right">{maxPrice} €</TableCell>
          </TableRow>

          <TableRow key={"min-price"}>
            <TableCell component="th" scope="row">
                Lowest price so far
            </TableCell>
            <TableCell align="right">{minPrice} €</TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}
