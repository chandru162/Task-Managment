import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container, Table, TableBody, TableCell, TableRow, Avatar, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function Profile() {
  const Navigate = useNavigate();
  const [data, setdata] = useState(null);
  const [message, setmessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  useEffect(() => {
    const FechProfileData = async () => {
      try {
        const responce = await Axios.get(
          `http://localhost:5000/api/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setdata(responce.data.user);
      } catch (error) {
        console.log("Error: ", error);
        setmessage("Session has time out Please Login");
        setTimeout(() => {
          Navigate("/login");
        }, 5000);
      }
    };
    FechProfileData();
  }, [Navigate]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await Axios.put(`http://localhost:5000/api/auth/updateuser`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setmessage("Profile updated successfully");
      handleClose();
    } catch (error) {
      console.log("Error: ", error);
      setmessage("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    try {
      await Axios.delete(
        `http://localhost:5000/api/auth/deleteuser/${data.userId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setmessage("Profile deleted successfully");
      setTimeout(() => {
        Navigate("/login");
      }, 2000);
    } catch (error) {
      console.log("Error: ", error);
      setmessage("Failed to delete profile");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    Navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      {data ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Avatar
            alt="profile"
            src="https://www.w3schools.com/howto/img_avatar.png"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">Name:</TableCell>
                <TableCell>{data.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Email:</TableCell>
                <TableCell>{data.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">UserId:</TableCell>
                <TableCell>{data.userId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">User Type:</TableCell>
                <TableCell>{data.usertype}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Phone:</TableCell>
                <TableCell>{data.phone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box mt={2} display="flex" justifyContent="space-between" width="100%">
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Update Profile
            </Button>
            <Button variant="contained" color="error" onClick={handleClickOpenDelete}>
              Delete Profile
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClickOpenLogout}>
              Logout
            </Button>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                name="username"
                label="Name"
                type="text"
                fullWidth
                value={data.username}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={data.email}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="phone"
                label="Phone"
                type="text"
                fullWidth
                value={data.phone}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleUpdate} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete your &quot;Profile&quot;?</Typography>
              <Typography >&quot;Delete data from database&quot;</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openLogout} onClose={handleCloseLogout}>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to &quot;Logout&quot;?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseLogout} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleLogout} color="primary">
                Logout
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : (
        <Typography color="error" align="center">{message}</Typography>
      )}
    </Container>
  );
}

export default Profile;