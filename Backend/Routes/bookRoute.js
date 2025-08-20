import express from 'express';
import { roles } from '../middlewares/roles.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { addBook, getAllBooks, getBookById, updateBook, deleteBook ,
    returnBook,borrowBook
} from '../Controllers/bookController.js';


const router = express.Router();
// Route to add a new book
router.post('/add', verifyToken, roles('admin', 'librarian'), addBook);
// Route to get all books
router.get('/all', verifyToken,getAllBooks);
// Route to get a book by ID
router.get('/:id', verifyToken, getBookById);
// Route to update a book
router.put('/:id', verifyToken, roles('admin', 'librarian'), updateBook);
// route to delete a book
router.delete('/:id', verifyToken, roles('admin', 'librarian'), deleteBook);
// Route to borrow a book
router.get('/borrow/:id', verifyToken, borrowBook);
// Route to return a book
router.get('/return/:id', verifyToken, returnBook);

export {router as bookRoutes};