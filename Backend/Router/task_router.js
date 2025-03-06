
const express = require('express')
const router = express.Router()

const { createTask, getTaskById, getTaskByProjectId, AllTaskSearchAndFilters, updateTask, DeleteTask, DateFilter, DueDateFilter, PriorityFilter, SearchAndFilters } = require("../Controllers/task_controller.js")

router.post('/createtask', createTask)
router.get('/gettaskbyid/:userId', getTaskById)
// router.get('/gettaskbyprojectid/:projectId', getTaskByProjectId)
router.put('/updatetask/:taskId', updateTask)
router.delete('/deletetask/:taskId', DeleteTask)
// router.get('/datefilter', DateFilter)
// router.get('/duedatefilter', DueDateFilter)
// router.get('/priorityfilter/:priority', PriorityFilter)
router.get('/getalltask', AllTaskSearchAndFilters)

module.exports = router;
