const Project = require("../Models/project_model.js");
const User = require("../Models/user_model.js")
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

exports.createProject = async (req, res) => {
  try {
    const { userId,time, date, projectId, projectName, projectDescription, priority } =
      req.body;
    if (
      !userId ||
      !time ||
      !date ||
      !projectName ||
      !projectDescription ||
      !priority
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const project = new Project({
      userId,
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
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Session expired, please login" });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);
    if (!decode) {
      return res.status(400).json({ message: "Invalid token" });
    }

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

exports.GetAllprojectForAdmin = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(400).json({ message: "Session expired, please login" });
        }

        const decode = jwt.verify(token, process.env.JWT_KEY);
        if (!decode) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const user = await User.findOne({ userId: decode.userId }).exec();
        if (!user || user.userType !== 'Admin') {
            return res.status(403).json({ message: "Access denied" });
        }

      const project = await Project.find().exec();
        res.status(200).json({ project });

    } catch (error) {
        console.log("Get all project for admin error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
