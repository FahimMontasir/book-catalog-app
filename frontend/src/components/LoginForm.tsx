'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/redux/features/user/userApi';
import { useAppDispatch } from '@/redux/hook';
import { setUserInfo } from '@/redux/features/user/userSlice';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [login, { isError }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    login({ email: data.email, password: data.password })
      .unwrap()
      .then((data) => {
        dispatch(setUserInfo({ userToken: data.data.accessToken }));
        navigate('/');
      });
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <Button>Login with email</Button>
          {isError && (
            <p className="text-red-500">Your email or password is incorrect!</p>
          )}
        </div>
      </form>
    </div>
  );
}
