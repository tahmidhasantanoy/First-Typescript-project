import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();
//This router method will provide all the method

// route will call controller function
router.post('/create-student', studentController.createStudent);
