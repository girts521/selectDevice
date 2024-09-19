import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function ShareButton({ Button, Icon, text, url }) {
  return (
    <ListItem>
      <ListItemButton>
        <Button url={url}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              padding: "5px 8px",
            }}
          >
            <Icon size={32} round />
            <Typography sx={{ paddingLeft: "7px" }}>{text}</Typography>
          </Paper>
        </Button>{" "}
      </ListItemButton>
    </ListItem>
  );
}
