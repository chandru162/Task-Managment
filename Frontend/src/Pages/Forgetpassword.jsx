import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Container } from "@mui/material";

function Forgetpassword() {
  const Navigate = useNavigate();
  const [UserId, setUserId] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setmessage] = useState("");

  const handleForgetpassword = async (e) => {
    e.preventDefault();
    try {
      const responce = await Axios.put(
        `http://localhost:5000/api/auth/forgetpassword`,
        { userId: UserId, password: Password }
      );
      alert(responce?.data?.message || "Updation Successful");
      setUserId("");
      setPassword("");
      Navigate("/login");
    } catch (error) {
      console.log(error);
      setmessage(
        error?.response?.data?.message || "Something went wrong, try again"
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <form onSubmit={handleForgetpassword}>
          <Typography variant="h4" component="h1" gutterBottom>
            Update New Password
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            type="text"
            label="UserId"
            value={UserId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Enter New Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography color="error">{message}</Typography>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Password
          </Button>
          <Box mt={2}>
            <Link to="/signup">Create a new account?</Link>
          </Box>
          <Box mt={1}>
            <Link to="/login">Go to Login</Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Forgetpassword;
