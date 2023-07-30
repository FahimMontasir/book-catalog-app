import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useUpdateBookMutation } from '@/redux/features/books/bookApi';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

interface IBookUpdateForm {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

export default function UpdateBook() {
  const { toast } = useToast();
  const { id } = useParams();
  const { state } = useLocation();
  console.log({ state });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBookUpdateForm>({ defaultValues: { ...state } });

  const [update] = useUpdateBookMutation();

  const onSubmit = (data: IBookUpdateForm) => {
    console.log({ data });
    update({ id, data })
      .unwrap()
      .then((data) => {
        toast({ description: data.message });
        reset();
      })
      .catch((e) => {
        toast({ description: e.message });
      });
  };

  return (
    <>
      <div className="container">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          <h1 className="text-2xl font-semibold tracking-tight">
            Update your book details
          </h1>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Input
                    id="title"
                    placeholder="Enter your book title"
                    type="text"
                    autoCorrect="off"
                    {...register('title', { required: 'Title is required' })}
                  />
                  {errors.title && <p>{errors.title.message}</p>}
                  <Input
                    id="Author"
                    placeholder="Enter author name"
                    type="text"
                    {...register('author', {
                      required: 'Author name is required',
                    })}
                  />
                  {errors.author && <p>{errors.author.message}</p>}
                  <Input
                    id="genre"
                    placeholder="Enter genre"
                    type="text"
                    {...register('genre', {
                      required: 'Genre is required',
                    })}
                  />
                  {errors.genre && <p>{errors.genre.message}</p>}
                  <Input
                    id="publicationDate"
                    placeholder="Enter publication year"
                    type="text"
                    {...register('publicationDate', {
                      required: 'publicationDate is required',
                    })}
                  />
                  {errors.publicationDate && (
                    <p>{errors.publicationDate.message}</p>
                  )}
                </div>
                <Button>update book</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
