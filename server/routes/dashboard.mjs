import express from 'express';
import { dashboardController, viewNoteController, updateNoteController, deleteNoteController, addNoteController, SubmitNoteController, Search, SearchSubmit } from '../controllers/dahsboardController.mjs';
import { Router } from 'express';
import checkAuth from '../middleware/cehckAuth.mjs';


/* 
    APP ROUTES 
*/
const mainRoute = Router();
mainRoute.get('/dashboard', checkAuth, dashboardController);
mainRoute.get('/dashboard/item/:id', checkAuth, viewNoteController);
mainRoute.put('/dashboard/item/:id', checkAuth, updateNoteController);
mainRoute.delete('/dashboard/item-delete/:id', checkAuth, deleteNoteController);
mainRoute.get('/dashboard/add', checkAuth, addNoteController);
mainRoute.post('/dashboard/add', checkAuth, SubmitNoteController);
mainRoute.get('/dashboard/search', checkAuth, Search);
mainRoute.post('/dashboard/search', checkAuth, SearchSubmit);




export default mainRoute;