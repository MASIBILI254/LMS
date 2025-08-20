import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    category: {
      type: String,
      enum: ["Science", "Math", "History", "Literature", "Technology", "Other"],
      default: "Other",
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    availableCopies: {
        type: Number,
        required: true,
        default: 1,
    },
     borrowedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        borrowedAt: {
          type: Date,
          default: Date.now,
        },
        dueDate: {
          type: Date,
        },
        returnedAt: {
          type: Date,
        },
        penalty: {
          type: Number,
          default: 0,
        },
      },
    ],
},
{timestamps: true}
)
// calculate penalty if book is returned late( max 14 days from borrowedAt an d then charge ksh.10 per day)
bookSchema.methods.calculatePenalty = function() {
    const today = new Date();
    const borrowedAt = this.borrowedBy[0]?.borrowedAt || today;
    const dueDate = this.borrowedBy[0]?.dueDate || new Date(borrowedAt);
    
    if (today > dueDate) {
        const lateDays = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
        return lateDays * 10; // Ksh.10 per day
    }
    return 0;
};
const Book = mongoose.model('Book', bookSchema);
export default Book;