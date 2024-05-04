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


export default function My_AppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
             <Link color={"inherit"} underline="none" href="/">My Tech Finder</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {<DrawerList close={toggleDrawer} />}
      </Drawer>{" "}
    </>
  );
}
