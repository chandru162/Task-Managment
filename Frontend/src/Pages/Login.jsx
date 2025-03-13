import {useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Container} from "@mui/material";

function Login() {
  const Navigate = useNavigate();
  const [UserId, setUserId] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setmessage] = useState("");

const checking = sessionStorage.getItem("token");
useEffect(()=>{
  Navigate("/profile")
},[Navigate])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {    
      


      const responce = await Axios.post(
        `http://localhost:5000/api/auth/login`,
        {
          userId: UserId,
          password: Password,
        }
      );
      alert(responce?.data?.message || "Login Successful");
      sessionStorage.setItem("token", responce?.data?.token || "");
      
      if (checking) {
        setTimeout(() => {
          sessionStorage.removeItem("token");
        },14395000);
      }

      Navigate("/");

    } catch (error) {
      console.log(error);
      setmessage(
        error?.response?.data?.message || "Invalid username or password"
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
        height="50vh"
      >
        <form onSubmit={handleLogin}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
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
            label="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box textAlign="right" width="100%">
            <Link
              to="/forgetpassword"
            >
              Forget password?
            </Link>
          </Box>
          <Typography color="error">{message}</Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Login now
          </Button>
          <Box textAlign="left" width="100%" mt={2}>
            <Link to="/signup">Create a new account?</Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
