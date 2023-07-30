import express from 'express';
import { BookRouter } from '../modules/book/book.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: BookRouter,
  },
];

moduleRoutes.map(r => router.use(r.path, r.route));

export default router;
