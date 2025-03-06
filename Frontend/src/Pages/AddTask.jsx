import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Box,
  Container,
} from "@mui/material";

function AddTask() {
  const Navigate = useNavigate();
  const [User, setUser] = useState("");
  const [Time,setTime] = useState(new Date().toLocaleTimeString());
  const [ProjectId, setProjectId] = useState("");
  const [TaskName, setTaskName] = useState("");
  const [ProjectName, setProjectName] = useState("");
  const [TaskDescription, setTaskDescription] = useState("");
  const [Priority, setPriority] = useState("");
  const [Status, setStatus] = useState("");
  const [CreatedDate, setCreatedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [DueDate, setDueDate] = useState("");
  const [message, setmessage] = useState("");
  const [projects, setProjects] = useState([]);

  const Email = User.email;
  const Username = User.userName;
  const UserId = User.userId;
  const UserType = User.userType;
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
        setUser(responce?.data?.user || "");
      } catch (error) {
        console.log("Error: ", error);
        setmessage("Session has time out or somthing faild !");
      }
    };
    FetchProfileData();
  }, [Navigate]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await Axios.get(
          "http://localhost:5000/api/project/getallproject"
        );
        setProjects(res?.data?.project || []);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const selectedProject = projects.find(
      (pro) => pro._id !== ProjectId
    );
    if (selectedProject) {
      setPriority(selectedProject.priority);
      setProjectId(selectedProject.projectId);
    }
    else{
      console.log("selectedProject faid");
    }
  }, [ProjectId, projects]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const InputClear = () => {
      setmessage("");
      setTaskName("");
      setProjectId("");
      setTaskDescription("");
      setPriority("");
      setStatus("");
      setCreatedDate("");
      setDueDate("");
    };

    Axios.post(`http://localhost:5000/api/task/createtask`, {
      taskName: TaskName,
      projectName: ProjectName,
      email: Email,
      time: Time,
      userName: Username,
      userId: UserId,
      userType: UserType,
      phone: Phone,
      projectId: ProjectId,
      taskDescription: TaskDescription,
      priority: Priority,
      status: Status,
      date: CreatedDate,
      dueDate: DueDate,
    })



        .then((res) => {
          InputClear();
          alert(res?.data?.message || "Task created successfully!");
          console.log({
            taskName: TaskName,
            email: Email,
            time: Time,
            userName: Username,
            userId: UserId,
            userType: UserType,
            phone: Phone,
            projectId: ProjectId,
            taskDescription: TaskDescription,
            priority: Priority,
            status: Status,
            date: CreatedDate,
            dueDate: DueDate,
          });
          Navigate(-1);
        })
        .catch((error) => {
          setmessage(error?.res?.data?.message || "Somthing Wrong!");
                    console.log({
                      taskName: TaskName,
                      email: Email,
                      time: Time,
                      userName: Username,
                      userId: UserId,
                      userType: UserType,
                      phone: Phone,
                      projectId: ProjectId,
                      taskDescription: TaskDescription,
                      priority: Priority,
                      status: Status,
                      date: CreatedDate,
                      dueDate: DueDate,
                    });
        });
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: "50px", marginTop: "50px" }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Add Task
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            type="text"
            label="Task Name"
            value={TaskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            type="text"
            label="Task Description"
            value={TaskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Project Name</InputLabel>
            <Select
              value={ProjectName}
              onChange={(e) => setProjectName(e.target.value)}
              label="Project Name"
            >
              {projects.map((project) => (
                <MenuItem
                  key={project._id}
                  value={project.projectName}
                  onChange={(e) => {setProjectName(e.target.value)}}
                >
                  {project.projectName}
                </MenuItem>
              ))}
            </Select>

          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            type="time"
            label="Created Date"
            InputLabelProps={{ shrink: true }}
            value={Time}
            onChange={(e) => setTime(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            type="date"
            label="Created Date"
            InputLabelProps={{ shrink: true }}
            value={CreatedDate}
            desabled
            onChange={(e) => setCreatedDate(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            type="date"
            label="Due Date"
            InputLabelProps={{ shrink: true }}
            value={DueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={Priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Priority"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={Status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Ongoing">Ongoing</MenuItem>
              <MenuItem value="Hold">Hold</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
          <Typography color="error">{message}</Typography>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Task
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default AddTask;
