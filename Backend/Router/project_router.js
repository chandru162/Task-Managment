const express = require("express");
const {
  createProject,
  DeleteProject,
  UpdateProject,
  getAllProject,
  GetAllprojectForAdmin,
} = require("../Controllers/project_controller.js");

const router = express.Router();

router.get("/getallproject", getAllProject);
router.get("/getallprojectforadmin", GetAllprojectForAdmin);

router.post("/createproject", createProject);

router.put("/updateproject/:projectId", UpdateProject);

router.delete("/deleteproject/:projectId", DeleteProject);

module.exports = router;
