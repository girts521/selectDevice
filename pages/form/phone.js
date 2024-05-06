import * as react from "react"
import Container from "@mui/material/Container";


export default function phone() {
    return (
        <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        //   mt: 50,
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <h1>Phone form coming soon <a href="/">Home</a></h1>
        </Container>
    )
}