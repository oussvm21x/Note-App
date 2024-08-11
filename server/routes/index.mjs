import { homepage, about } from '../controllers/main.mjs';
import { Router } from 'express';


/* 
    APP ROUTES 
*/
const mainRoute = Router();
mainRoute.get('/', homepage);
mainRoute.get('/about', about);

export default mainRoute;