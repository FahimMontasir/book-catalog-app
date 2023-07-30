import { useAppSelector } from '@/redux/hook';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { userToken } = useAppSelector((state) => state.localUser);

  const { pathname } = useLocation();

  if (!userToken) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}
