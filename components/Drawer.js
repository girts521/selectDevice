import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ComputerIcon from '@mui/icons-material/Computer';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import { Link } from "@mui/material";

export default function DrawerList(props) {
  const urls = ["/", "/form", "/form/laptop", "/form/phone"];
    return (
    <Box sx={{ width: 250 }} role="presentation" onClick={props.close(false)}>
      <List>
        {["Home", "Form", "Laptop Form", "Phone form"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <HomeIcon />}
                {index === 1 && <FeedIcon />}
                {index === 2 && <ComputerIcon />}
                {index === 3 && <SmartphoneIcon />}
              </ListItemIcon>
              <Link underline="none" color={"inherit"} href={urls[index]}><ListItemText primary={text} /></Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
    )
};
