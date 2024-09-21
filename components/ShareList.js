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
import ShareButton from "./ShareButton";

export default function ShareList({ url }) {
  return (
    <List>
      <ShareButton
        ShareComponent={FacebookShareButton}
        IconComponent={FacebookIcon}
        label="Facebook"
        url={url}
      />
      <ShareButton
        ShareComponent={WhatsappShareButton}
        IconComponent={WhatsappIcon}
        label="Whatsapp"
        url={url}
      />
      <ShareButton
        ShareComponent={LinkedinShareButton}
        IconComponent={LinkedinIcon}
        label="Linkedin"
        url={url}
      />
      <ShareButton
        ShareComponent={RedditShareButton}
        IconComponent={RedditIcon}
        label="Reddit"
        url={url}
      />
      <ShareButton
        ShareComponent={TelegramShareButton}
        IconComponent={TelegramIcon}
        label="Telegram"
        url={url}
      />
      <ShareButton
        ShareComponent={TwitterShareButton}
        IconComponent={XIcon}
        label="X"
        url={url}
      />
      <ShareButton
        ShareComponent={EmailShareButton}
        IconComponent={EmailIcon}
        label="Email"
        url={url}
      />
    </List>
  );
}
