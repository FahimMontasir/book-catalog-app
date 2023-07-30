import { Model, Types, Document } from 'mongoose';

export type IBook = Document & {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: [string];
  seller: Types.ObjectId;
};

export type IBookModel = Model<IBook, Record<string, unknown>>;

export type IBooksFilters = {
  searchTerm?: string;
};
