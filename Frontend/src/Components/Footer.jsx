import { Box, Typography, Link, Container, Grid } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
      style={{marginTop:"100px"}}
    >
      <Container maxWidth="lg" >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Task Management System
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your tasks efficiently and effectively.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Go To :
            </Typography>
            <Box>
              <Link href="/" color="inherit" sx={{ display: "block", mb: 1 }}>
                Home
              </Link>
              <Link
                href="/signup"
                color="inherit"
                sx={{ display: "block", mb: 1 }}
              >
                Signup
              </Link>
              <Link
                href="/login"
                color="inherit"
                sx={{ display: "block", mb: 1 }}
              >
                Login
              </Link>
              <Link
                href="/profile"
                color="inherit"
                sx={{ display: "block", mb: 1 }}
              >
                Profile
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: http://localhost:5173
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: 0987654321
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            {"© "}
            <Link color="inherit" href="http://localhost:5173/">
              Our Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
