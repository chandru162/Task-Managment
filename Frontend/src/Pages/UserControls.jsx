import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Container, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';

const UserControls = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                  "http://localhost:5000/api/auth/getalluserforadmin",
                  {
                    headers: {
                      Authorization: `Bearer ${sessionStorage.getItem(
                        "token"
                      )}`,
                    },
                  }
                );
                setUsers(response.data.users || []);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleClickOpen = (userId) => {
        setSelectedUserId(userId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUserId(null);
    };

    const deleteUser = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/auth/deleteuser/${selectedUserId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            setUsers(users.filter(user => user.userId !== selectedUserId));
            handleClose();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>User Details</Typography>
            <Grid container spacing={3}>
                {Array.isArray(users) && users.map((x, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card style={{boxShadow:"1px 1px 4px blue"}}>
                            <CardContent>
                                <Typography variant="h6" >Name : {x.userName}</Typography>
                                <Typography variant="h6" >Email : {x.email}</Typography>
                                <Typography variant="h6"  >User ID : {x.userId}</Typography>
                                <Typography variant="h6"  >User Type : {x.userType}</Typography>
                                <Typography variant="h6" >Phone : {x.phone}</Typography>
                                <Button variant="contained" color="secondary" onClick={() => handleClickOpen(x.userId)}>Delete</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteUser} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserControls;
