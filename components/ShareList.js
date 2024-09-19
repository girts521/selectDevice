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

export default function ShareList({url}) {
  return (
    <List>
      <ShareButton Button={FacebookShareButton} url={url} Icon={FacebookIcon} text={"Facebook"} />
      <ShareButton Button={WhatsappShareButton} url={url} Icon={WhatsappIcon} text={"Whatsapp"} />
      <ShareButton Button={LinkedinShareButton} url={url} Icon={LinkedinIcon} text={"Linkedin"} />
      <ShareButton Button={RedditShareButton} url={url} Icon={RedditIcon} text={"Reddit"} />
      <ShareButton Button={TelegramShareButton} url={url} Icon={TelegramIcon} text={"Telegram"} />
      <ShareButton Button={TwitterShareButton} url={url} Icon={XIcon} text={"X"} />
      <ShareButton Button={EmailShareButton} url={url} Icon={EmailIcon} text={"Email"} />
    </List>
  );
}
