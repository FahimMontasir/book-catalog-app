import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { addToFav } from '@/redux/features/favorite/favoriteSlice';
import { IBook } from '@/types/globalTypes';

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const dispatch = useAppDispatch();

  const handleAddFavorite = (book: IBook) => {
    dispatch(addToFav(book));
    toast({
      description: 'book Added',
    });
  };

  return (
    <div>
      <div className="rounded-2xl h-[250px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book?._id}`} className="w-full">
          <h1 className="text-xl font-semibold">{book?.title}</h1>
          <p>Genre: {book?.genre}</p>
          <p>Author: {book?.author}</p>
          <p>Reviews: {book?.reviews?.length}</p>
          <p>Publication Date: {book?.publicationDate}</p>
        </Link>
        <div className="flex gap-2">
          <Button variant="default" onClick={() => handleAddFavorite(book)}>
            Add to Favorite
          </Button>
        </div>
      </div>
    </div>
  );
}
