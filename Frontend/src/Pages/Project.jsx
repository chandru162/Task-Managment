import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

function Project() {
  const Navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [User, setUser] = useState("");

  useEffect(() => {
    fetchProjects();
  }, [projects]);

  useEffect(() => {
    const FechProfileData = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:5000/api/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setUser(responce.data.user || "");
      } catch (error) {
        console.log("Error: ", error);
        setTimeout(() => {
          Navigate("/login");
        }, 5000);
      }
    };
    FechProfileData();
  }, [Navigate]);

  const getCurrentTime = () => {
    let now = new Date();
    let Hors = now.getHours();
    let min = now.getMinutes();
    let ampm = Hors >= 12 ? "PM" : "AM";

    Hors = Hors % 12 || 12;
    const fulltime = `${Hors}:${min.toString().padStart(2, "0")}:${ampm}`;

    return fulltime;
  };

  const Time = getCurrentTime();

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/project/getallprojectforadmin`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setProjects(response.data.project || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const createProject = async () => {
    try {
      await axios.post("http://localhost:5000/api/project/createproject", {
        userId: User.userId,
        projectId,
        projectName,
        projectDescription,
        priority,
        time: Time,
        date,
      });
      setProjectId("");
      setProjectName("");
      setProjectDescription("");
      setPriority("");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const updateProject = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/project/updateproject/${projectId}`,
        {
          projectName,
          projectDescription,
          priority,
          // time: Time,
          // date,
        }
      );
      setProjectId("");
      setProjectName("");
      setProjectDescription("");
      setPriority("");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/project/deleteproject/${projectId}`
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleDeleteClick = (projectId) => {
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (projectToDelete) {
      await deleteProject(projectToDelete);
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const handleCreateClick = () => {
    setCreateDialogOpen(true);
  };

  const handleCreateClose = () => {
    setCreateDialogOpen(false);
  };

  const handleUpdateClick = (project) => {
    setProjectId(project.projectId);
    setProjectName(project.projectName);
    setProjectDescription(project.projectDescription);
    setPriority(project.priority);
    setDate(project.date);
    setUpdateDialogOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateDialogOpen(false);
    setProjectId("");
    setProjectName("");
    setProjectDescription("");
    setPriority("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="70vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Projects
        </Typography>
        <Button
          style={{ marginBottom: "20px" }}
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleCreateClick}
        >
          Add Project
        </Button>
        <TableContainer
          component={Paper}
          style={{ marginTop: "0px", height: "400px" }}
        >
          <Table hei>
            <TableHead>
              <TableRow>
                <TableCell>Project Id</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>{project.projectId}</TableCell>
                  <TableCell>{project.time}</TableCell>
                  <TableCell>{project.date}</TableCell>
                  <TableCell>{project.userId}</TableCell>
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell>{project.projectDescription}</TableCell>
                  <TableCell>{project.priority}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleUpdateClick(project)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteClick(project.projectId)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={createDialogOpen} onClose={handleCreateClose}>
          <DialogTitle>Create Project</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                createProject();
                handleCreateClose();
              }}
            >
              <TextField
                fullWidth
                margin="normal"
                type="text"
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                type="text"
                label="Project Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />

              {/* <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              /> */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priority}
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Create
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog open={updateDialogOpen} onClose={handleUpdateClose}>
          <DialogTitle>Update Project</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                updateProject();
                handleUpdateClose();
              }}
            >
              {/* <TextField
                fullWidth
                margin="normal"
                type="text"
                label="Project ID"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              /> */}
              <TextField
                fullWidth
                margin="normal"
                type="text"
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                type="text"
                label="Project Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
              {/* <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              /> */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priority}
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Update
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this project?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default Project;
