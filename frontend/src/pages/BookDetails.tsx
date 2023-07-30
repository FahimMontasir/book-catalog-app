import Review from '@/components/Review';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  useDeleteBookMutation,
  useSingleBookQuery,
} from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hook';
import { useNavigate, useParams } from 'react-router-dom';

export default function BookDetails() {
  const { toast } = useToast();

  const { userToken } = useAppSelector((state) => state.localUser);
  const navigate = useNavigate();

  const { id } = useParams();

  const { data } = useSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = () => {
    deleteBook(id)
      .unwrap()
      .then((data) => {
        toast({ description: data.message });
      })
      .catch((data) => {
        toast({ description: data.message });
      });
  };

  return (
    <>
      <div className="mt-10 flex max-w-7xl mx-auto items-center justify-center border-b border-gray-300">
        <div className="space-y-3">
          {userToken && (
            <div className="flex gap-4">
              <Button onClick={handleDelete} variant="secondary">
                Delete
              </Button>

              <Button
                onClick={() =>
                  navigate(`/update-book/${data?.data?._id}`, {
                    state: data?.data,
                  })
                }
              >
                Edit
              </Button>
            </div>
          )}
          <h1 className="text-3xl font-semibold">{data?.data?.title}</h1>
          <p className="text-xl">Author: {data?.data?.author}</p>
          <p className="text-xl">Genre: {data?.data?.genre}</p>
          <p className="text-xl">
            Publication Date: {data?.data?.publicationDate}
          </p>
          B
        </div>
      </div>
      {userToken && <Review id={id as string} reviews={data?.data?.reviews} />}
    </>
  );
}
