import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  Edit,
  Delete,
  Search,
  CheckCircle,
  HourglassEmpty,
  Add,
} from "@mui/icons-material";

function Dashboard() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [priority, setPriority] = useState("");
  const [date, setdate] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          navigate("/login");
        }
        const response = await Axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserType(response?.data?.user?.userType || "");
        setUserId(response?.data?.user?.userId);
      } catch (error) {
        console.error("Error fetching profile: ", error);
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (userType === "Admin") {
          const responce = await Axios.get(`http://localhost:5000/api/task/getalltask`, {
            params: { search, status, date, dueDate, priority }
          });
          setTasks(responce?.data?.task || []);
        } else if (userType === "Employee") {
          const resp = await Axios.get(
            `http://localhost:5000/api/task/gettaskbyid/${userId}`,
            {
              params: { search, status, date, dueDate, priority },
            }
          );
          setTasks(resp?.data?.task || []);
        }
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };
    if (userType) {
      fetchTasks();
    }
  }, [date, dueDate, priority, search, status, userId, userType]);

  const handleDeleteTask = async () => {
    try {
      await Axios.delete(
        `http://localhost:5000/api/task/deletetask/${selectedTaskId}`
      );
      setTasks(tasks.filter((task) => task.taskId !== selectedTaskId));
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {userType === "Admin" ? "Admin Dashboard" : "Employee Dashboard"}
      </Typography>
      {userType === "Admin" ? (
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          gap={2}
          marginTop={3}
        >
          <Tooltip title="Project page">
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: "50px" }}
              onClick={() => navigate("/project")}
              startIcon={<Add />}
            >
              project
            </Button>
          </Tooltip>
          <Tooltip title="Admin Add Task for Employee">
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: "50px" }}
              onClick={() => navigate("/addtasktoemployee")}
              startIcon={<Add />}
            >
              Add Task for Employee
            </Button>
          </Tooltip>
          <Tooltip title="Go to user Controlls">
            <Button
              variant="contained"
              color="primary"
              // fullWidth
              style={{ marginBottom: "50px" }}
              onClick={() => navigate("/usercontrolls")}
              startIcon={<Add />}
            >
              User Controlls
            </Button>
          </Tooltip>
        </Grid>
      ) : (
        ""
      )}

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search ID's"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ endAdornment: <Search /> }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Ongoing">Ongoing</MenuItem>
              <MenuItem value="Hold">Hold</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setdueDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title="Create a task for me">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/addtask")}
              fullWidth
              startIcon={<Add />}
            >
              Add Task
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      <TableContainer
        component={Paper}
        sx={{
          marginTop: 3,
          overflowY: "scroll",
          maxWidth: "100%",
          overflowX: "scroll",
        }}
        style={{ height: "80vh" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className="tablecell" style={{ color: "darkblue" }}>
                TaskID
              </TableCell>
              <TableCell className="tablecell" style={{ color: "darkblue" }}>
                Time
              </TableCell>
              <TableCell className="tablecell" style={{ color: "darkblue" }}>
                Date
              </TableCell>
              <TableCell className="tablecell" style={{ color: "darkblue" }}>
                UserId
              </TableCell>
              <TableCell className="tablecell" style={{ color: "darkblue" }}>
                TaskName
              </TableCell>
              <TableCell className="tablecell" style={{ color: "darkblue" }}>
                TaskDescription
              </TableCell>
              <TableCell className="tablecell" style={{ color: "darkblue" }}>
                ProjectId
              </TableCell>
              <TableCell className="tablecell" style={{ color: "darkblue" }}>
                ProjectName
              </TableCell>
              <TableCell className="tablecell" style={{ color: "darkblue" }}>
                Status
              </TableCell>
              <TableCell className="tablecell" style={{ color: "darkblue" }}>
                Priority
              </TableCell>
              <TableCell className="tablecell" style={{ color: "darkblue" }}>
                DueDate
              </TableCell>
              <TableCell className="tablecell" style={{ color: "darkblue" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(tasks) &&
              tasks.map((x) => (
                <TableRow key={x._id}>
                  <TableCell className="tablecell" style={{ color: "red" }}>
                    {x.taskId}
                  </TableCell>
                  <TableCell className="tablecell">{x.time}</TableCell>
                  <TableCell className="tablecell">{x.date}</TableCell>
                  <TableCell className="tablecell" style={{ color: "red" }}>
                    {x.userId}
                  </TableCell>
                  <TableCell className="tablecell">{x.taskName}</TableCell>
                  <TableCell className="tablecell">
                    {x.taskDescription}
                  </TableCell>
                  <TableCell className="tablecell" style={{ color: "red" }}>
                    {x.projectId}
                  </TableCell>
                  <TableCell className="tablecell">{x.projectName}</TableCell>
                  <TableCell className="tablecell">
                    <Chip
                      label={x.status}
                      color={x.status === "Done" ? "success" : "warning"}
                      icon={
                        x.status === "Done" ? (
                          <CheckCircle />
                        ) : (
                          <HourglassEmpty />
                        )
                      }
                    />
                  </TableCell>
                  <TableCell
                    style={{ color: x.priority === "High" ? "red" : "blue" }}
                  >
                    {x.priority}
                  </TableCell>
                  <TableCell>{x.dueDate}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit Task">
                      <IconButton
                        onClick={() => navigate(`/updatetask/${x.taskId}`)}
                      >
                        <Edit color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Task">
                      <IconButton
                        onClick={() => {
                          setSelectedTaskId(x.taskId);
                          setOpenDialog(true);
                        }}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteTask} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Dashboard;
