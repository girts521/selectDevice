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

export default function DrawerLink({text, index, urls}) {
  return (
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
  );
}
