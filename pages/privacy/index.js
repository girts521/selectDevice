import * as React from "react";
import Container from "@mui/material/Container";
import My_AppBar from "../../components/AppBar";
import Footer from "../../components/Footer";

export default function Tos() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 14, sm: 20 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <h1>Privacy Policy</h1>

      <p>
        Thank you for using our website! We are committed to protecting your
        privacy and ensuring the security of your personal information. This
        Privacy Policy outlines how we collect, use, and safeguard your data
        when you visit our website.
      </p>

      <h3>1. Information We Collect</h3>

      <p>
        We do not collect any of your personal information. The only information
        that is asked is the answers to the form questions(that do not include
        any personal data). Those answers are saved in your
        browser(localStorage), and are never saved by us anywhere else. Those
        answers are used for specifications for the device you are looking for.
        The specifications are used to search for relevant products.
      </p>

      <h3>2. Cookies</h3>

      <p>
        We may use cookies in the future to enhance your browsing experience and
        provide personalized content. You can disable cookies through your
        browser settings, but please note that some features of our website may
        not function properly as a result.
      </p>

      <h3>3. Survey Data</h3>

      <p>
        When you participate in our survey, we collect and store the selected
        answers in your browser (localStorage). We do not collect any personally
        identifiable information or store your survey responses on our servers.
      </p>

      <h3>4. Third-Party Services</h3>

      <p>
        We are using Facebook Pixel for marketing purposes. These services may
        use cookies and collect additional information. Please refer to their
        respective privacy policies for more information.
      </p>

      <h3>5. Data Security</h3>

      <p>
        No personal data is being collected or stored anywhere. Form answers are
        being stored only in your browser and used to form device
        specifications.
      </p>

      <p>
        If you have any questions or concerns about, please contact us at contact@gkarcevskis.com.
      </p>
    </Container>
  );
}
