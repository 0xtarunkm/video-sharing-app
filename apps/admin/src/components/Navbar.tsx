import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userEmailState, userNameState } from 'store';
import toast from 'react-hot-toast';

const navlinks = [
  {
    title: 'Videos',
    path: '/videos',
  },
  {
    title: 'Add Video',
    path: '/add-video',
  },
];

export default function Navbar() {
  const userName = useRecoilValue(userNameState);
  const userEmail = useRecoilValue(userEmailState);

  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-4 py-3 shadow-md sticky top-0 bg-white">
      {/* left section */}
      <section>
        <Link to={'/'} className="text-3xl font-bold">
          Admin
        </Link>
      </section>

      {/* middle section */}
      <section className="flex items-center space-x-10">
        {navlinks.map((link) => (
          <Link
            to={link.path}
            key={link.title}
            className="text-gray-600 hover:text-gray-800 hover:underline"
          >
            {link.title}
          </Link>
        ))}
      </section>

      {/* right section */}
      <section>
        {userEmail ? (
          <div className="flex items-center space-x-3">
            <div>
              <span className="text-gray-600 text-sm">Welcome </span>
              <span className="text-gray-600 font-semibold">{userName}</span>
            </div>
            <button
              className="btn"
              onClick={() => {
                localStorage.removeItem('token');
                toast.success('Logged out successfully');

                navigate('/signin');
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              className="btn"
              onClick={() => {
                navigate('/signin');
              }}
            >
              Login
            </button>
            <button
              className="btn"
              onClick={() => {
                navigate('/signup');
              }}
            >
              Signup
            </button>
          </div>
        )}
      </section>
    </nav>
  );
}
