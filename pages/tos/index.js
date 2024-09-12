import * as React from "react";
import Container from '@mui/material/Container';

export default function Tos() {
  return (
    <Container
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: { xs: 14, sm: 20 },
      pb: { xs: 8, sm: 12 },
    }}
  >
      <h1>Terms of Service</h1>

      <h2>
        By using our website, you agree to the following Terms of Service:
      </h2>

      <h3>1. Use of Content</h3>

      <p>
        All content provided on our website, including blog articles and survey
        questions, is for informational purposes only. We make no
        representations or warranties of any kind, express or implied, about the
        accuracy, reliability, or suitability of the content. Please make your
        own informed decision before making any kind of purchase. The purpose of
        this website is to provide you with basic information about device
        specifications as well as make suggestions. Suggestions are just that, a
        suggestion and in no way a guarantee of anything. The additional AI
        suggestion, also should be taken with a certain doubt. AI is provided
        with the selected laptop specifications and your selected use case, the
        AI then formulates a suggestion.
      </p>

      <h3>2. User Conduct</h3>

      <p>
        You agree to use our website in compliance with all applicable laws and
        regulations. You shall not engage in any conduct that violates the
        rights of others or inhibits their use and enjoyment of the website.
      </p>

      <h3>3. Limitation of Liability</h3>

      <p>
        We shall not be liable for any direct, indirect, incidental, special, or
        consequential damages arising out of or in any way connected with your
        use of our website, whether based on contract, tort, strict liability,
        or otherwise. I am not liable for the product you have purchased, in any
        way.{" "}
      </p>

      <h3>4. Modifications to Terms</h3>

      <p>
        We reserve the right to modify these Terms of Service at any time
        without prior notice. By continuing to use our website after any
        changes, you agree to be bound by the revised Terms.
      </p>

      <h3>5. Governing Law</h3>

      <p>
        These Terms of Service shall be governed by and construed in accordance
        with the laws of Germany, without regard to its conflict of law
        provisions.
      </p>

      <p>
        If you have any questions or concerns about our Privacy Policy or Terms
        of Service, please contact us at contact@gkarcevskis.com.
      </p>
    </Container>
  );
}
