import Book from "../model/bookModel.js";

export const addBook = async (req, res) => {
    const { title, author, category, publishedDate, isbn, availableCopies } = req.body;

    try {
        if (!title || !author || !publishedDate || !isbn) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if book already exists
        const existingBook = await Book.findOne({ title });
        if (existingBook) {
            existingBook.availableCopies += 1;
            await existingBook.save();
            return res.status(200).json({
                message: "Book already exists, available copies increased",
                book: existingBook
            });
        }

        // Otherwise create a new book
        const newBook = new Book({
            title,
            author,
            category,
            publishedDate,
            isbn,
            availableCopies
        });

        await newBook.save();
        return res.status(201).json({ message: "Book added successfully", book: newBook });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ message: "Books retrieved successfully", books });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
// get book by id
export const getBookById = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book retrieved successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
// update book
export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, category, publishedDate, isbn, availableCopies } = req.body;

    try {
        const book = await Book.findByIdAndUpdate(id, {
            title,
            author,
            category,
            publishedDate,
            isbn,
            availableCopies
        }, { new: true });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book updated successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
// delete book
export const deleteBook = async (req,res) => {
    const{id} = req.params;
    try {
        const book = await Book.findByIdAndDelete(id);
        if(!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
    
}
// borrow book
export const borrowBook = async (req, res) => {
    const{id} = req.params;
    try {
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({ message: "Book not found" });
        }
        if(book.availableCopies <= 0) {
            return res.status(400).json({ message: "No available copies to borrow" });
        }
        const userId = req.user.id; // assuming user ID is stored in req.user after authentication
        const borrowedAt = new Date();
        const dueDate = new Date(borrowedAt);
        dueDate.setDate(dueDate.getDate() + 14); // set due date
        book.borrowedBy.push({
            user: userId,
            borrowedAt,
            dueDate
        });
        book.availableCopies -= 1; // decrease available copies
        await book.save();
        res.status(200).json({ message: "Book borrowed successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
// return book
export const returnBook = async (req, res) => {
    const{id} = req.params;
    try {
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({ message: "Book not found" });
        
        }
        const userId = req.user.id; // assuming user ID is stored in req.user after authentication
        const borrowedEntry = book.borrowedBy.find(entry => entry.user.toString() === userId);
        if(!borrowedEntry) {
            return res.status(400).json({ message: "You have not borrowed this book" });
        }
        const returnedAt = new Date();
        borrowedEntry.returnedAt = returnedAt;
        borrowedEntry.penalty = book.calculatePenalty(); // calculate penalty if any
        book.availableCopies += 1; // increase available copies
        await book.save();
        res.status(200).json({ message: "Book returned successfully", book });
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}