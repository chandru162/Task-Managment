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

function AddTaskToEmployee() {
  const Navigate = useNavigate();
  const [ProjectId, setProjectId] = useState("");
  const [UserId, setUserId] = useState("");
  const [UserType] = useState("Employee");
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
  const [Users, setUsers] = useState([]);


    const getCurrentTime = () => {
      let now = new Date();
      let Hors = now.getHours();
      let min = now.getMinutes();
      let ampm = Hors >= 12 ? "PM" : "AM";

      Hors = Hors % 12 || 12;
      const fulltime = `${Hors}:${min.toString().padStart(2, "0")}:${ampm}`;

      return fulltime;
    };

  useEffect(() => {
    const FetchProfileData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          alert("Session has timeout!, please log in!");
          Navigate("/login");
        }

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
    const fechUsers = async () => {
      try {
        const token = sessionStorage.getItem("token")
        const res = await Axios.get(
          "http://localhost:5000/api/auth/getalluserforadmin",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(res?.data?.users || []);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    fechUsers();
  }, []);
    // useEffect(() => {
    //   const selectteduser = Users.find((use) => use.userId === UserId);
    //   if (selectteduser) {
    //     setProjectId(selectteduser.user);
    //   } else {
    //     console.log("Selected project not found");
    //   }
    // }, [UserId, Users]);

     

  useEffect(() => {
    const selectedProject = projects.find(
      (pro) => pro.projectName === ProjectName
    );
    if (selectedProject) {
      setProjectId(selectedProject.projectId);
    } else {
      console.log("Selected project not found");
    }
  }, [ProjectName, projects]);

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

    const Time = getCurrentTime()

    Axios.post(`http://localhost:5000/api/task/addtasktoemployee`, {
      taskName: TaskName,
      projectName: ProjectName,
      userId : UserId,
      time: Time,
      userType: UserType,
      projectId: ProjectId,
      taskDescription: TaskDescription,
      priority: Priority,
      status: Status,
      date: CreatedDate,
      dueDate: DueDate,
    })
      .then((res) => {
        InputClear();
        alert(res?.data?.message || "Task assigned to employee successfully!");

        Navigate(-1);
      })
      .catch((error) => {
        setmessage(
          error?.responce?.data?.message || "All fields are required"
        );

      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
      >
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: "100px", marginTop: "50px" }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Add Task to Employee
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel>User Id</InputLabel>
            <Select
              value={UserId}
              onChange={(e) => setUserId(e.target.value)}
              label="User ID"
            >
              {Users.map((x) => (
                <MenuItem
                  key={x._id}
                  value={x.userId}
                  onChange={(e) => {
                    setUserId(e.target.value);
                  }}
                >
                  {x.userId} -- {x.userName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
                  onChange={(e) => {
                    setProjectName(e.target.value);
                  }}
                >
                  {project.projectId} - {project.projectName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            Add Task to Employee
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default AddTaskToEmployee;
