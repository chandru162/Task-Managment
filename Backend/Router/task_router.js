
const express = require('express')
const router = express.Router()

const { createTask, getAllTask, getTaskById, getTaskByProjectId, updateTask, DeleteTask, DateFilter, DueDateFilter, PriorityFilter, SearchAndFilters } = require("../Controllers/task_controller.js")

router.post('/createtask', createTask)
router.get('/getalltask', getAllTask)
router.get('/gettaskbyid/:userId', getTaskById)
router.get('/gettaskbyprojectid/:projectId', getTaskByProjectId)
router.put('/updatetask/:projectId', updateTask)
router.delete('/deletetask/:projectId', DeleteTask)
// router.get('/datefilter', DateFilter)
// router.get('/duedatefilter', DueDateFilter)
// router.get('/priorityfilter/:priority', PriorityFilter)
router.get('/taskfilter', SearchAndFilters)

module.exports = router;
