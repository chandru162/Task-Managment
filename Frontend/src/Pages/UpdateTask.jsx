import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Container } from '@mui/material';

function UpdateTask() {
  const Navigate = useNavigate();
  const { taskId } = useParams();
  const [User, setUser] = useState("");
  const [TaskName, setTaskName] = useState("");
  const [TaskDescription, setTaskDescription] = useState("");
  const [Priority, setPriority] = useState("");
  const [Status, setStatus] = useState("");
  const [DueDate, setDueDate] = useState("");
  const [message, setmessage] = useState("");

  const Email = User.email;
  const Username = User.username;
  const UserId = User.userId;
  const UserType = User.usertype;
  const Phone = User.phone;

  useEffect(() => {
    const FetchProfileData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          alert("Session has timeout!, please log in!");
          Navigate("/login");
        }
        const responce = await Axios.get(
          `http://localhost:5000/api/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setUser(responce?.data?.user);
      } catch (error) {
        console.log("Error: ", error);
        setmessage("Session has time out Please Login");
      }
    };
    FetchProfileData();
    console.log(taskId)
  }, [Navigate, taskId]);

  useEffect(() => {
    const FetchTaskData = async () => {
      try {
        const responce = await Axios.get(
          `http://localhost:5000/api/task/gettaskbyprojectid/${taskId}`
        );
        const task = responce?.data?.task;
        setTaskName(task?.projectname);
        setTaskDescription(task?.projectdescription);
        setPriority(task?.priority);
        setStatus(task?.status);
        setDueDate(task?.dueDate);
      } catch (error) {
        console.log("Error: ", error);
        setmessage("Failed to fetch task data");
      }
    };
    FetchTaskData();
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.put(`http://localhost:5000/api/task/updatetask/${taskId}`, {
      projectname: TaskName,
      email: Email,
      username: Username,
      userId: UserId,
      userType: UserType,
      phone: Phone,
      projectdescription: TaskDescription,
      priority: Priority,
      status: Status,
      dueDate: DueDate,
    })
      .then((res) => {
        alert(res?.data?.message || "Task updated successfully!");
        Navigate("/")

      })
      .catch((err) => {
        console.log(err);
        setmessage(err?.response?.data?.message || "Something wrong");
      });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit} style={{marginBottom:"50px"}}>
        <Typography variant="h4" component="h1" gutterBottom>Update Task</Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            id="task-name"
            label="Task Name"
            variant="outlined"
            value={TaskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="task-description"
            label="Task Description"
            variant="outlined"
            value={TaskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="due-date"
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={DueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            id="priority"
            value={Priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value=""><em>Select Priority</em></MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={Status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value=""><em>Select Status</em></MenuItem>
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Hold">Hold</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
        <Typography color="error" variant="body2">{message}</Typography>
        <Button type="submit" variant="contained" color="primary" fullWidth>Update Task</Button>
      </form>
    </Container>
  );
}

export default UpdateTask;
