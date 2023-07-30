import { PAGINATION_FIELDS } from '../../constants/pagination';
import ApiError from '../../errors/ApiError';
import { catchAsync } from '../../shared/catchAsync';
import pick from '../../shared/pick';
import { sendResponse } from '../../shared/sendResponse';
import { BOOKS_FILTERABLE } from './book.constant';
import { BookService } from './book.service';

const createBook = catchAsync(async (req, res) => {
  const data = await BookService.createBook({ ...req.body, seller: req.user._id });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book created successfully',
    data,
  });
});

const getBook = catchAsync(async (req, res) => {
  const data = await BookService.getBook(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book retrieved successfully',
    data,
  });
});

const getBooks = catchAsync(async (req, res) => {
  const filters = pick(req.query, BOOKS_FILTERABLE);
  const paginationOptions = pick(req.query, PAGINATION_FIELDS);

  const data = await BookService.getBooks(filters, paginationOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Books retrieved successfully',
    data,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const bookData = await BookService.getBook(req.params.id);

  if (_id !== String(bookData?.seller)) {
    throw new ApiError(409, "You don't have access to this book");
  }

  await BookService.updateBook(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'book updated successfully',
  });
});

const addBookReview = catchAsync(async (req, res) => {
  await BookService.addBookReview(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'book review added successfully',
  });
});

const deleteBook = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const bookData = await BookService.getBook(req.params.id);

  if (_id !== String(bookData?.seller)) {
    throw new ApiError(409, "You don't have access to this book");
  }

  const data = await BookService.deleteBook(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'book deleted successfully',
    data,
  });
});

export const BookController = {
  createBook,
  getBook,
  getBooks,
  updateBook,
  addBookReview,
  deleteBook,
};
