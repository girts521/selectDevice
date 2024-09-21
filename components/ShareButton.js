import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function ShareButton({
  ShareComponent,
  IconComponent,
  label,
  url,
}) {
  return (
    <ListItem>
      <ListItemButton>
        <ShareComponent url={url}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "5px 8px",
            }}
          >
            <IconComponent size={32} round />
            <Typography sx={{ paddingLeft: "7px" }}>{label}</Typography>
          </Paper>
        </ShareComponent>
      </ListItemButton>
    </ListItem>
  );
}
