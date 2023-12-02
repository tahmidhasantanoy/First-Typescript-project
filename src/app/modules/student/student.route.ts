import express from 'express';
import { studentController } from './student.controller';

//This router will provide all the method
const router = express.Router();
router.use(express.json());

// route will call controller function
router.post('/create-student', studentController.createStudent);

router.get('/', studentController.getAllStudent);

//single student data with query params
router.get('/:studentId', studentController.getSingleStudent); //video dekha start korte hbe ...

router.delete('/:studentId', studentController.deleteStudent);

export const studentRoutes = router;
