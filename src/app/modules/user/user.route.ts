import express from 'express';
import { userController } from './user.controller';

const route = express.Router();
route.use(express.json());

route.post("/user/create-student",userController.createStudent)
