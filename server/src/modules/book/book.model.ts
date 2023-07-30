import { Schema, model } from 'mongoose';
import { IBook, IBookModel } from './book.interface';

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: String,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviews: [String],
});

export const Book = model<IBook, IBookModel>('Book', bookSchema);
