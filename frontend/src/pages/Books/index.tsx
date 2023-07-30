import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';

import { IBook } from '@/types/globalTypes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { data } = useGetBooksQuery({
    searchTerm,
  });

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative mt-5">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <div className="mb-5 flex justify-center">
            <Button onClick={() => navigate('/add-book')}>Add New Book</Button>
          </div>
          <h1 className="text-2xl uppercase">Search And Filter</h1>
          <div className="flex items-center space-x-2 mt-3">
            <Input
              id="search"
              placeholder="Search..."
              type="text"
              onBlur={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {data?.data?.data?.map((book: IBook) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}
