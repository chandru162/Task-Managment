import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function ColumnGroupingTable() {
  const Navigate = useNavigate();
  const [UserType, setUserType] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [EmployeeId, setEmployeeId] = useState(null);
  const [Task, setTask] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleDialogOpen = (action, taskId) => {
    setDialogAction(action);
    setSelectedTaskId(taskId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogAction(null);
    setSelectedTaskId(null);
  };

  const handleDialogConfirm = async () => {
    if (dialogAction === 'delete') {
      try {
        await Axios.delete(`http://localhost:5000/api/task/deletetask/${selectedTaskId}`);
        setTask(Task.filter(task => task.projectId !== selectedTaskId));
      } catch (error) {
        console.error("Error deleting task: ", error);
      }
    } else if (dialogAction === 'update') {
      Navigate(`/updatetask/${selectedTaskId}`);
    }
    handleDialogClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          Navigate("/login");
        }
        const response = await Axios.get(
          `http://localhost:5000/api/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setUserType(response?.data?.user?.usertype || null);
        setEmployeeId(response?.data?.user?.userId || null);

        if (response.data.user.usertype === "Employee") {
          const res = await Axios.get(
            `http://localhost:5000/api/task/gettaskbyid/${EmployeeId}`,
                        {
              params: {
                status,
                date,
                dueDate,
                priority,
              },
            }
          );
            setTask(res?.data?.task);





        } else if (response.data.user.usertype === "Admin") {
          const res = await Axios.get(
            `http://localhost:5000/api/task/taskfilter`,
            {
              params: {
                status,
                date,
                dueDate,
                priority,
              },
            }
          );
          setTask(res?.data?.task || []);
        } else {
          console.log("data fetching error");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [EmployeeId, Navigate, date, dueDate, priority, search, status]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {UserType === "Admin" ? "Admin Dashboard" : "Employee Dashboard"}
      </Typography>
      <Grid container spacing={2} className="admin-controls">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Priority"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Ongoing">Ongoing</MenuItem>
              <MenuItem value="Hold">Hold</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Created Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="contained" color="primary" component={Link} to="/addtask">
          Add Task
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Id</TableCell>
              <TableCell>Task Name</TableCell>
              <TableCell>Task Description</TableCell>
              <TableCell>UserId</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Task ending</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Task.map((x) => (
              <TableRow key={x._id}>
                <TableCell>{x.projectId}</TableCell>
                <TableCell>{x.projectname}</TableCell>
                <TableCell>{x.projectdescription}</TableCell>
                <TableCell>{x.userId}</TableCell>
                <TableCell>{x.username}</TableCell>
                <TableCell>{x.email}</TableCell>
                <TableCell>{x.phone}</TableCell>
                <TableCell>{x.userType}</TableCell>
                <TableCell>{x.priority}</TableCell>
                <TableCell>{x.status}</TableCell>
                <TableCell>{x.date}</TableCell>
                <TableCell>{x.dueDate}</TableCell>
                <TableCell>
                  <Button
                    className="update-task-btn"
                    onClick={() => handleDialogOpen('update', x.projectId)}
                  >
                    Update
                  </Button>
                  <Button
                    className="delete-task-btn"
                    onClick={() => handleDialogOpen('delete', x.projectId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to &quot;{dialogAction}&quot; this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleDialogConfirm} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ColumnGroupingTable;
