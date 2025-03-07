import { useState ,useEffect} from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Typography,
  Box,
  Container,
} from "@mui/material";

function Signup() {
  const Navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  // const [UserId, setUserId] = useState("");
  const [UserType, setUserType] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");


    useEffect(()=>{
            const checking = sessionStorage.getItem("token");
            if (checking) {
              alert("You already loged in!");
              Navigate("/profile");
            }
  
    },[Navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Password !== ConfirmPassword) {
      setMessage("Password and Confirm Password are not same");
      return;
    }

    const InputClear = () => {
      setEmail("");
      setUsername("");
      // setUserId("");
      setUserType("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setMessage("");
    };

    Axios.post(`http://localhost:5000/api/auth/signup`, {
      email: Email,
      userName: Username,
      userType: UserType,
      phone: Phone,
      password: Password,
    })
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        alert("Sign up successfully!");
        InputClear();
        Navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="70vh"
      >
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: "100px", marginBottom: "70px"}}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign up
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            type="email"
            label="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            type="text"
            label="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <TextField
            fullWidth
            margin="normal"
            type="text"
            label="UserId"
            value={UserId}
            onChange={(e) => setUserId(e.target.value)}
          /> */}
          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Phone"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Confirm Password"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormLabel component="legend">User Type</FormLabel>
          <RadioGroup
            row
            name="userType"
            value={UserType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
            <FormControlLabel
              value="Employee"
              control={<Radio />}
              label="Employee"
            />
          </RadioGroup>
          <Typography color="error">{message}</Typography>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Signup now
          </Button>
          <Typography variant="body2" align="left" sx={{ marginTop: 2 }}>
            <Link to="/login">Already have an account?</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}

export default Signup;