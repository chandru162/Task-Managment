import './App.css';
import Login from './Pages/Login';
import Nopage from './Pages/Nopage';
import Signup from './Pages/Signup';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Forgetpassword from './Pages/Forgetpassword';
import Profile from './Pages/Profile';
import Dashboard from "./Pages/Dashboard.jsx"
// import Navbar from './Components/Navbar';
import AddTask from './Pages/AddTask';
import UpdateTask from './Pages/UpdateTask';
import { CircularProgress, Box, Container ,Button } from '@mui/material';
import Footer from './Components/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Project from './Pages/Project';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router} from "react-router-dom";

// -----
// import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";

import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt from "@mui/icons-material/PersonAddAlt";
import Badge from "@mui/icons-material/Badge";
import ControlPoint from "@mui/icons-material/ControlPoint";
import WbSunny from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import AddTaskToEmployee from './Pages/AddTaskToEmployee.jsx';
import UserControls from './Pages/UserControls.jsx';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function App() {
  const [loading, setloading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  const DrawerList = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component="a" href="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component="a" href="/addtask">
          <ListItemIcon>
            <ControlPoint />
          </ListItemIcon>
          <ListItemText primary="Add Task" />
        </ListItem>
        <Divider />
        <ListItem button component="a" href="/login">
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component="a" href="/signup">
          <ListItemIcon>
            <PersonAddAlt />
          </ListItemIcon>
          <ListItemText primary="Signup" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component="a" href="/profile">
          <ListItemIcon>
            <Badge />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Box>
  );

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1500);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <CircularProgress />
          <Box mt={2}>Loading...</Box>
        </Box>
      ) : (
        <Router>
          <Container maxWidth="xl">
            <Button
              onClick={toggleDrawer(true)}
              variant="outlined"
              color="primary"
              width="100px"
            >
              <MenuIcon />
            </Button>
            <br/>
            {/* <Button
              variant="outlined"
              color="secondary"
              startIcon={<ArrowBackIcon />}
              onClick={() => window.history.back()}
              disabled={window.location.pathname === "/"}
              style={{marginTop:"10px"}}
            >
              Back
            </Button> */}

            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList()}
            </Drawer>
            <Box mt={-4} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDarkMode(!darkMode)}
                startIcon={darkMode ? <WbSunny /> : <DarkModeIcon />}
              >
                {/* {darkMode ? "Light Mode" : "Dark Mode"} */}
              </Button>
            </Box>
            <Box mt={4}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgetpassword" element={<Forgetpassword />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/addtask" element={<AddTask />} />
                <Route path="/project" element={<Project />} />
                <Route path="/updatetask/:taskId" element={<UpdateTask />} />
                <Route path="/usercontrolls" element={<UserControls />} />
                <Route
                  path="/addtasktoemployee"
                  element={<AddTaskToEmployee />}
                />
                <Route path="*" element={<Nopage />} />
              </Routes>
            </Box>
            <Footer />
          </Container>
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;