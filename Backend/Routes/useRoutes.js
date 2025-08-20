import express from 'express';
import  {roles}  from '../middlewares/roles.js';
import {verifyToken} from '../middlewares/verifyToken.js';
import {registerUser,loginUser,getAllUsers,deleteUser,
    updateUser,addUser,getUserById } from '../Controllers/userController.js';

const router = express.Router();
// Example route that uses the roles middleware
router.post('/register',registerUser);
router.post('/login', loginUser);
router.get('/all', verifyToken, roles('admin','librarian'), getAllUsers);  
router.get('/:id', verifyToken, roles('admin','librarian'), getUserById);  
router.post('/add', verifyToken, roles('admin'), addUser);  
router.delete('/:id', verifyToken, roles('admin'), deleteUser); 
router.put('/:id', verifyToken, roles('admin'), updateUser); 


export { router as useRoutes };