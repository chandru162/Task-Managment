const Task = require("../Models/task_modele.js");

exports.createTask = async (req, res) => {
  try {
    const {
      taskId,
      time,
      date,
      email,
      phone,
      userId,
      userType,
      userName,
      projectId,
      projectName,
      taskName,
      taskDescription,
      status,
      dueDate,
      priority,
    } = req.body;
    if (
      !date ||
      !projectId ||
      !userName ||
      !projectName ||
      !taskName ||
      !taskDescription ||
      !status ||
      !dueDate
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const task = new Task({
      taskId,
      time,
      date,
      email,
      phone,
      userId,
      userType,
      userName,
      projectId,
      projectName,
      taskName,
      taskDescription,
      status,
      dueDate,
      priority,
    });
    if (!task) {
      return res.status(400).json({ message: "task creation faild" });
    }
    await task.save();
    res.status(200).json({ message: "Task created successfully", task });
  } catch (error) {
    console.log("Error in creating task", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.getAllTask = async (req, res) => {
//   try {
//     const task = await Task.find();
//     if (!task) {
//       return res.status(400).json({ message: "Task list is empty" });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     console.log("Error in getting all task", error);
//     res.status(500).json({ message: "Internal server error" });

//   }
// };

// for admin

exports.AllTaskSearchAndFilters = async (req, res) => {
  try {
    const { search,status, date, dueDate, priority } = req.query
    let filter = {}
    if (search) {
      filter.$or = [
        { taskId: { $regex: search, $options: "i" } },
        { projectId: { $regex: search, $options: "i" } },
      ];
    }

    if (priority) {
      filter.priority = priority;
    }

    if (status) {
      filter.status = status;
    }
    if (date) {
      filter.date = date;
    }
    if (dueDate) {
      filter.dueDate = dueDate;
    }

    const task = await Task.find(filter);
    if (!task) {
      return res.status(400).json({ message: "Task list is empty" });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.log("Error in getting  task", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// for user
exports.getTaskById = async (req, res) => {
  try {
    const { search, status, date, dueDate, priority } = req.query;
    let filter = { userId: req.params.userId }
    if (search) {
      filter.$or = [
        { taskId: { $regex: search, $options: "i" } },
        { projectId: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status;
    }
    if (priority) {
      filter.priority = priority;
    }
    if (date) {
      filter.date = date;
    }
    if (dueDate) {
      filter.dueDate = dueDate;
    }

    const task = await Task.find(filter);

    if (!task) {
      return res.status(400).json({ message: "Task list is empty" });
    }

    res.status(200).json({task});
  } catch (error) {
    console.log("Error in getting task by id", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// exports.getTaskByProjectId = async (req, res) => {
//   try {
//     const task = await Task.findOne({ projectId: req.params.projectId }).exec();

//     if (!task) {
//       return res.status(400).json({ message: "task not found!" });
//     }

//     res.status(200).json({ task });
//   } catch (error) {
//     console.log("Error in getting task by project by Id", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { taskId: req.params.taskId },
      { $set: req.body },
      { new: true }
    );
    if (!task) {
      return res.status(400).json({ message: "Task not updated" });
    }
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.log("Error in updating task", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.DeleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      taskId: req.params.taskId,
    });
    if (!task) {
      return res.status(400).json({ message: "Task not deleted" });
    }
    res.status(200).json({ message: "Task deleted successfully", task });
  } catch (error) {
    console.log("Error in deleting task", error);
    res.status(500).json({ message: "Internal server" });
  }
};

// for admin
// exports.DateFilter = async (req, res) => {
//   try {
//     const task = await Task.find({ date: req.body.date });
//     if (!task) {
//       return res.status(400).json({ message: "Task not found" });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     console.log("Error in date filter", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// exports.DueDateFilter = async (req, res) => {
//   try {
//     const task = await Task.find({ dueDate: req.body.dueDate });
//     if (!task) {
//       return res.status(400).json({ message: "Task not found" });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     console.log("Error in date filter", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.PriorityFilter = async (req, res) => {
//   try {
//     const task = await Task.find({ priority: req.params.priority });
//     if (!task) {
//       return res.status(400).json({ message: "Task not found" });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     console.log("Error in filter", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
