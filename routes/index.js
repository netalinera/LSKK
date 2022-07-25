 import express from "express"
 import { getUsers, createUsers, updateUsers, deleteUsers, getUsersById } from "../controllers/userController.js"
 import { getDevices, createDevices, updateDevices, deleteDevices, getDevicesById, getapi } from "../controllers/deviceController.js"

 const router = express.Router()
//user
 router.get('/user/', getUsers)
 router.post('/user/', createUsers)
 router.patch('/user/:id', updateUsers)
 router.delete('/user/:id', deleteUsers)
 router.get('/user/:id', getUsersById)

//device
 router.get('/device/', getDevices)
 router.post('/device/', createDevices)
 router.patch('/device/:id', updateDevices)
 router.delete('/device/:id', deleteDevices)
 router.get('/device/:id', getDevicesById)
router.post('/mqtt', getapi)


 export default router