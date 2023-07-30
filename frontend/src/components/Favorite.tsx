import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  HiMinus,
  HiOutlinePlus,
  HiOutlineTrash,
  HiHeart,
} from 'react-icons/hi';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  addToFav,
  removeFromFav,
  removeOne,
} from '@/redux/features/favorite/favoriteSlice';

export default function Cart() {
  const { books, total } = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <HiHeart size="25" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Favorite List</SheetTitle>
          <h1>Total: {total}</h1>
        </SheetHeader>
        <div className="space-y-5">
          {books.map((book) => (
            <div
              className="border h-44 p-5 flex justify-between rounded-md"
              key={book._id}
            >
              <div className="px-2 w-full flex flex-col gap-3">
                <h1 className="text-2xl self-center">{book?.title}</h1>
                <p>Author: {book?.author}</p>
                <p>Genre: {book?.genre}</p>
                <p>Fav Count: {book?.quantity}</p>
              </div>
              <div className="border-l pl-5 flex flex-col justify-between">
                <Button onClick={() => dispatch(addToFav(book))}>
                  <HiOutlinePlus size="20" />
                </Button>
                <Button onClick={() => dispatch(removeOne(book))}>
                  <HiMinus size="20" />
                </Button>
                <Button
                  onClick={() => dispatch(removeFromFav(book))}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                >
                  <HiOutlineTrash size="20" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
