import { SortOrder } from 'mongoose';
import ApiError from '../../errors/ApiError';
import { IGenericPaginationResponse, IPaginationOptions } from '../../interfaces/common';
import { paginationHelpers } from '../../shared/pagination';
import { BOOKS_FILTERABLE } from './book.constant';
import { IBook, IBooksFilters } from './book.interface';
import { Book } from './book.model';

const createBook = async (book: IBook): Promise<IBook | null> => {
  const result = await Book.create(book);

  return result;
};

const getBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  if (!result) {
    throw new ApiError(404, 'No book found');
  }
  return result;
};

const getBooks = async (
  filters: IBooksFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IBook[] | null>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: BOOKS_FILTERABLE.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions).sort(sortConditions).skip(skip).limit(limit);

  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateBook = async (id: string, payload: Partial<IBook>): Promise<void> => {
  const isBookExits = await Book.exists({ _id: id });
  if (!isBookExits) {
    throw new ApiError(404, 'book not found.');
  }

  await Book.findOneAndUpdate({ _id: id }, payload);
};

const addBookReview = async (id: string, payload: { review: string }): Promise<void> => {
  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(404, 'book not found.');
  }

  book.reviews.push(payload.review);
  await book.save();
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(409, 'Book already deleted');
  }

  return result;
};

export const BookService = {
  createBook,
  getBook,
  getBooks,
  updateBook,
  addBookReview,
  deleteBook,
};
