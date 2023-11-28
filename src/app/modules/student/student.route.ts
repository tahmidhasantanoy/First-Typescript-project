import express from 'express';
import { studentController } from './student.controller';

//This router will provide all the method
const router = express.Router();
router.use(express.json())

// route will call controller function
router.post('/create-student', studentController.createStudent);  

router.get("/",studentController.getAllStudent)

export const studentRoutes = router; 
