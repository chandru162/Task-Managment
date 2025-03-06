import './App.css';
import Login from './Pages/Login';
import Nopage from './Pages/Nopage';
import Signup from './Pages/Signup';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Forgetpassword from './Pages/Forgetpassword';
import Profile from './Pages/Profile';
import Dashboard from "./Pages/Dashboard.jsx"
import Navbar from './Components/Navbar';
import AddTask from './Pages/AddTask';
import UpdateTask from './Pages/UpdateTask';
import { CircularProgress, Box, Container ,Button } from '@mui/material';
import Footer from './Components/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Project from './Pages/Project';

function App() {
  const [loading, setloading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 3000);
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
        <Container maxWidth="xl">
          <Navbar />
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
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
              <Route path="*" element={<Nopage />} />
            </Routes>
          </Box>
          <Footer />
        </Container>
      )}
    </ThemeProvider>
  );
}

export default App;