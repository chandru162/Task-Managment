import { Box, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Nopage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1" component="div" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" component="div" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </Container>
  );
}

export default Nopage;
