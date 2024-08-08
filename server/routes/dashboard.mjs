import express from 'express';
import { dashboardController } from '../controllers/dahsboardController.mjs';
import { Router } from 'express';


/* 
    APP ROUTES 
*/
const mainRoute = Router();
mainRoute.get('/dashboard', dashboardController);

export default mainRoute;