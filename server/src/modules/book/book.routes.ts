import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

router.get('/:id', BookController.getBook);

router.get('/', BookController.getBooks);

router.patch(
  '/:id',
  auth(),
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook
);

router.patch(
  '/review/:id',
  auth(),
  validateRequest(BookValidation.addBookReviewsZodSchema),
  BookController.addBookReview
);

router.delete('/:id', auth(), BookController.deleteBook);

export const BookRouter = router;
