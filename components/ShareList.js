import {
  FacebookShareButton,
  WhatsappShareButton,
  RedditShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  EmailShareButton,
  EmailIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  WhatsappIcon,
  XIcon,
  FacebookIcon,
} from "react-share";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";



export default function ShareList({url}) {
  return (
    <List>
      <ListItem>
        <ListItemButton>
          <FacebookShareButton url={url}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                padding: "5px 8px",
              }}
            >
              <FacebookIcon size={32} round />{" "}
              <Typography sx={{ paddingLeft: "7px" }}>Facebook</Typography>
            </Paper>
          </FacebookShareButton>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <WhatsappShareButton url={url}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                padding: "5px 8px",
              }}
            >
              <WhatsappIcon size={32} round />{" "}
              <Typography sx={{ paddingLeft: "7px" }}>Whatsapp</Typography>
            </Paper>
          </WhatsappShareButton>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <LinkedinShareButton url={url}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                padding: "5px 8px",
              }}
            >
              <LinkedinIcon size={32} round />{" "}
              <Typography sx={{ paddingLeft: "7px" }}>Linkedin</Typography>
            </Paper>
          </LinkedinShareButton>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <RedditShareButton url={url}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                padding: "5px 8px",
              }}
            >
              <RedditIcon size={32} round />{" "}
              <Typography sx={{ paddingLeft: "7px" }}>Reddit</Typography>
            </Paper>
          </RedditShareButton>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <TelegramShareButton url={url}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                padding: "5px 8px",
              }}
            >
              <TelegramIcon size={32} round />{" "}
              <Typography sx={{ paddingLeft: "7px" }}>Telegram</Typography>
            </Paper>
          </TelegramShareButton>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <TwitterShareButton url={url}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                padding: "5px 8px",
              }}
            >
              <XIcon size={32} round />{" "}
              <Typography sx={{ paddingLeft: "7px" }}>X</Typography>
            </Paper>
          </TwitterShareButton>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <EmailShareButton url={url}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                padding: "5px 8px",
              }}
            >
              <EmailIcon size={32} round />{" "}
              <Typography sx={{ paddingLeft: "7px" }}>Email</Typography>
            </Paper>
          </EmailShareButton>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
