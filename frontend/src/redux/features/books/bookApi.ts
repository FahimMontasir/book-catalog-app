import { api } from '@/redux/api/apiSlice';
import { buildQueryString } from '@/utils/buildQueryString';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (obj) => `/books?${buildQueryString(obj)}`,
      providesTags: ['book'],
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['review', 'book'],
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: `/books`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['book'],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['book'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['book'],
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/review/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['review'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  usePostReviewMutation,
} = bookApi;
