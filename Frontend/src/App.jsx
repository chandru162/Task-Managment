import './App.css';
import Login from './Pages/Login';
import Nopage from './Pages/Nopage';
import Signup from './Pages/Signup';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Forgetpassword from './Pages/Forgetpassword';
import Profile from './Pages/Profile';
import ColumnGroupingTable from "./Pages/ColumnGroupingTable";
import Navbar from './Components/Navbar';
import AddTask from './Pages/AddTask';
import UpdateTask from './Pages/UpdateTask';
import { CircularProgress, Box, Container } from '@mui/material';
import Footer from './Components/Footer';

function App() {
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
          <CircularProgress />
          <Box mt={2}>Loading...</Box>
        </Box>
      ) : (
        <Container>
          <Navbar />

          <Box mt={4}>
            <Routes>
              <Route path="/" element={<ColumnGroupingTable />}>
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/forgetpassword" element={<Forgetpassword />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/addtask" element={<AddTask />} />
              <Route path="/updatetask/:taskId" element={<UpdateTask />} />

              <Route path="*" element={<Nopage />} />
            </Routes>
          </Box>

          <Footer/>
        </Container>
      )}
    </>
  );
}

export default App;