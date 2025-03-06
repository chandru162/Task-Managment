const Project = require("../Models/project_model.js");

exports.createProject = async (req, res) => {
  try {
    const { time, date, projectId, projectName, projectDescription, priority } =
      req.body;
    if (
      !time ||
      !date ||
      !projectName ||
      !projectDescription ||
      !priority
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const project = new Project({
      time,
      date,
      projectId,
      projectName,
      projectDescription,
      priority,
    });
    if (!project) {
      return res.status(400).json({ message: "project creation faild" });
    }
    await project.save();
    res.status(200).json({ message: "project created successfully", project  });
  } catch (error) {
    console.log("Error in creating project", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.DeleteProject = async (req, res) => {
  try {
    const projectId  = req.params.projectId;
    if (!projectId) {
      return res.status(400).json({ message: "projectId are required"});
    }
    const project = await Project.findOneAndDelete({ projectId });
    if (!project) {
      return res.status(400).json({ message: "project not deleted " });
    }
    res.status(200).json({ message: "project Delete successfully", project });
  } catch (error) {
    console.log("Error in delete project", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.UpdateProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      return res.status(400).json({ message: "projectId are required" });
    }
    const project = await Project.findOneAndUpdate(
      { projectId },
      { $set: req.body },
      { new: true }
    );
    if (!project) {
      return res.status(400).json({ message: "project not Update " });
    }
    res.status(200).json({ message: "project update successfully", project });
  } catch (error) {
    console.log("Error in update project", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllProject = async (req, res) => {
  try {
    const project = await Project.find();
    if (!project) {
      return res.status(400).json({ message: "project list is empty" });
    }
    res.status(200).json({ project });
  } catch (error) {
    console.log("Error in getting all task", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
