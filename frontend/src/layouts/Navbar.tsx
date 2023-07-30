import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Favorite from '../components/Favorite';
import logo from '../assets/images/book-catalog-logo.png';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { removeUserInfo } from '@/redux/features/user/userSlice';

export default function Navbar() {
  const localUser = useAppSelector((state) => state.localUser);
  const dispatch = useAppDispatch();

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <img className="h-[150px]" src={logo} alt="book catalog app logo" />
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/books">All Books</Link>
                </Button>
              </li>
              {!localUser.userToken ? (
                <>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </li>
                </>
              ) : (
                <li>
                  <Button onClick={() => dispatch(removeUserInfo())}>
                    Logout
                  </Button>
                </li>
              )}
              <li>
                <Favorite />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
