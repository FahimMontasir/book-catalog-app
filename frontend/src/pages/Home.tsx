import BookCard from '@/components/BookCard';
import Footer from '@/layouts/Footer';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { IBook } from '@/types/globalTypes';

export default function Home() {
  const { data } = useGetBooksQuery({});
  return (
    <>
      <section className="mx-10 md:mx-20 my-10 md:my-15 flex flex-wrap gap-5 justify-center">
        {data?.data?.data.map((v: IBook) => (
          <BookCard book={v} key={v._id} />
        ))}
      </section>
      <Footer />
    </>
  );
}
